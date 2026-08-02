import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WorkReviewRepository } from '../repositories/work-review.repository';
import { WorkReviewStepRepository } from '../repositories/work-review-step.repository';
import { WorkReviewDecisionRepository } from '../repositories/work-review-decision.repository';
import { WorkReviewStatus } from '../enums/work-review-status.enum';
import { ReviewStepStatus } from '../enums/review-step-status.enum';
import { ReviewDecision } from '../enums/review-decision.enum';
import { ReviewType } from '../enums/review-type.enum';
import { WorkStatusTransitionService } from '../../work-status-transition/services/work-status-transition.service';
import { WorkStatusService } from '../../work-status/services/work-status.service';
import { WorkActivityService } from '../../work-activity/services/work-activity.service';
import { WorkItemService } from '../../work-item/services/work-item.service';
import { WorkActivityAction } from '../../work-activity/enums/work-activity-action.enum';
import { StartReviewInput } from '../interfaces/start-review.input';
import { WorkReview } from '../entities/work-review.entity';
import { WorkReviewStep } from '../entities/work-review-step.entity';
import { ReviewActionInput } from '../interfaces/review-action.input';
import { WorkItemEntity } from '../../work-item/entities/work-item.entity';
import { AssignmentRole } from '../../work-item-assignment/enum/work-item-assignment.enum';

@Injectable()
export class ReviewEngineService {
  constructor(
    private readonly dataSource: DataSource,

    private readonly reviewRepository: WorkReviewRepository,

    private readonly stepRepository: WorkReviewStepRepository,

    private readonly decisionRepository: WorkReviewDecisionRepository,

    private readonly workStatusTransitionService: WorkStatusTransitionService,

    private readonly workItemService: WorkItemService,

    private readonly workStatusService: WorkStatusService,

    private readonly workActivityService: WorkActivityService,
  ) {}

  private resolveReviewer(
    workItem: WorkItemEntity,
    role: AssignmentRole,
  ): number {
    const assignment = workItem.assignments.find(
      (item) => item.role === role && item.userId,
    );

    if (!assignment?.userId) {
      throw new NotFoundException(`Reviewer with role ${role} not found`);
    }

    return assignment.userId;
  }

  private async createReview(input: StartReviewInput) {
    return this.reviewRepository.create({
      workItem: {
        id: input.workItemId,
      } as any,
      status: WorkReviewStatus.IN_PROGRESS,
      currentStep: 1,
      submittedBy: input.userId,
      submittedAt: new Date(),
    });
  }

  private async getCurrentStep(reviewId: number): Promise<WorkReviewStep> {
    const step = await this.stepRepository.findCurrentStep(reviewId);

    if (!step) {
      throw new NotFoundException(
        `Active review step not found for review ${reviewId}`,
      );
    }

    return step;
  }

  private async createDefaultSteps(review: WorkReview) {
    const workItem = review.workItem;
    const teamLeaderId = this.resolveReviewer(workItem, AssignmentRole.OWNER);
    const qaUserId = this.resolveReviewer(workItem, AssignmentRole.REVIEWER);

    return this.stepRepository.createMany([
      {
        review,
        stepOrder: 1,
        reviewType: ReviewType.TEAM_LEADER,
        reviewerId: teamLeaderId,
        status: ReviewStepStatus.ACTIVE,
      },

      {
        review,
        stepOrder: 2,
        reviewType: ReviewType.QA,
        reviewerId: qaUserId,
        status: ReviewStepStatus.WAITING,
      },
    ]);
  }

  private async saveDecision(
    step: WorkReviewStep,
    input: ReviewActionInput,
    decision: ReviewDecision,
  ) {
    return this.decisionRepository.create({
      reviewStep: step,
      decision,
      comment: input.comment,
      decidedBy: input.userId,
    });
  }

  private async rejectReview(reviewId: number, userId: number) {
    const review = await this.reviewRepository.findById(reviewId);

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.reviewRepository.update(reviewId, {
      status: WorkReviewStatus.REJECTED,
      completedAt: new Date(),
    });

    const reworkStatus =
      await this.workStatusService.findByCode('REWORK_REQUIRED');

    await this.workStatusTransitionService.canTransition(
      review.workItem.statusId,
      reworkStatus.id,
    );

    await this.workItemService.updateStatus(
      review.workItem.id,
      reworkStatus.id,
      userId,
    );

    await this.logActivity(review.workItem.id, userId, 'Review rejected');
  }

  private async logActivity(
    workItemId: number,
    userId: number,
    description: string,
  ) {
    await this.workActivityService.create({
      workItemId,
      action: WorkActivityAction.STATUS_CHANGED,
      actorId: userId,
      newValue: {
        description,
      },
    });
  }

  private async activateNextStep(step: WorkReviewStep) {
    await this.stepRepository.update(step.id, {
      status: ReviewStepStatus.ACTIVE,
      startedAt: new Date(),
    });

    await this.reviewRepository.update(step.review.id, {
      currentStep: step.stepOrder,
    });
  }

  private async completeReview(reviewId: number, userId: number) {
    const review = await this.reviewRepository.findById(reviewId);

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.reviewRepository.update(reviewId, {
      status: WorkReviewStatus.APPROVED,
      completedAt: new Date(),
    });

    const completedStatus =
      await this.workStatusService.findByCode('COMPLETED');

    await this.workStatusTransitionService.canTransition(
      review.workItem.statusId,
      completedStatus.id,
    );

    await this.workItemService.updateStatus(
      review.workItem.id,
      completedStatus.id,
      userId,
    );

    await this.logActivity(review.workItem.id, userId, 'Review completed');
  }

  async startReview(input: StartReviewInput) {
    const workItem = await this.workItemService.findOne(input.workItemId);

    const submittedStatus =
      await this.workStatusService.findByCode('SUBMITTED');

    await this.workStatusTransitionService.canTransition(
      workItem.statusId,
      submittedStatus.id,
    );

    const review = await this.createReview(input);

    await this.createDefaultSteps(review);

    await this.workItemService.updateStatus(
      input.workItemId,
      submittedStatus.id,
      input.userId,
    );

    await this.logActivity(
      input.workItemId,
      input.userId,
      'Work submitted for review',
    );

    return review;
  }

  async approve(input: ReviewActionInput) {
    const step = await this.getCurrentStep(input.reviewId);

    await this.saveDecision(step, input, ReviewDecision.APPROVE);

    await this.stepRepository.update(step.id, {
      status: ReviewStepStatus.APPROVED,
      completedAt: new Date(),
    });

    const next = await this.stepRepository.findNextStep(
      input.reviewId,
      step.stepOrder,
    );

    if (next) {
      await this.activateNextStep(next);
      return;
    }

    await this.completeReview(input.reviewId, input.userId);
  }

  async reject(input: ReviewActionInput) {
    const step = await this.getCurrentStep(input.reviewId);

    await this.saveDecision(step, input, ReviewDecision.REJECT);

    await this.stepRepository.update(step.id, {
      status: ReviewStepStatus.REJECTED,
      completedAt: new Date(),
    });

    await this.rejectReview(input.reviewId, input.userId);
  }
}
