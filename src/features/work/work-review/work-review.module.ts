import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkReview } from './entities/work-review.entity';
import { WorkReviewStep } from './entities/work-review-step.entity';
import { WorkReviewDecision } from './entities/work-review-decision.entity';
import { WorkStatusTransitionModule } from '../work-status-transition/work-status-transition.module';
import { WorkStatusModule } from '../work-status/work-status.module';
import { WorkItemModule } from '../work-item/work-item.module';
import { WorkActivityModule } from '../work-activity/work-activity.module';
import { WorkReviewController } from './controller/work-review.controller';
import { ReviewEngineService } from './services/review-engine.service';
import { WorkReviewRepository } from './repositories/work-review.repository';
import { WorkReviewStepRepository } from './repositories/work-review-step.repository';
import { WorkReviewDecisionRepository } from './repositories/work-review-decision.repository';
import { WorkReviewService } from './services/work-review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkReview, WorkReviewStep, WorkReviewDecision]),

    WorkStatusTransitionModule,
    WorkStatusModule,
    WorkItemModule,
    WorkActivityModule,
  ],

  controllers: [WorkReviewController],

  providers: [
    WorkReviewRepository,
    WorkReviewStepRepository,
    WorkReviewDecisionRepository,
    ReviewEngineService,
    WorkReviewService,
  ],

  exports: [ReviewEngineService],
})
export class WorkReviewModule {}
