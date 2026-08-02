import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { WorkReview } from './work-review.entity';

import { ReviewType } from '../enums/review-type.enum';

import { ReviewStepStatus } from '../enums/review-step-status.enum';

@Entity('work_review_steps')
export class WorkReviewStep {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id!: number;

  @ManyToOne(() => WorkReview, (review) => review.steps, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'review_id',
  })
  review!: WorkReview;

  @Column({
    name: 'step_order',
  })
  stepOrder!: number;

  @Column({
    type: 'enum',
    enum: ReviewType,
  })
  reviewType!: ReviewType;

  @Column({
    name: 'reviewer_id',
    type: 'bigint',
  })
  reviewerId!: number;

  @Column({
    type: 'enum',
    enum: ReviewStepStatus,
    default: ReviewStepStatus.WAITING,
  })
  status!: ReviewStepStatus;

  @Column({
    name: 'started_at',
    nullable: true,
  })
  startedAt?: Date;

  @Column({
    name: 'completed_at',
    nullable: true,
  })
  completedAt?: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}
