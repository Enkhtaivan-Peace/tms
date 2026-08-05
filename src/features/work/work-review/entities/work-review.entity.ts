import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { WorkReviewStatus } from '../enums/work-review-status.enum';
import { WorkItemEntity } from '../../work-item/entities/work-item.entity';
import { WorkReviewStep } from './work-review-step.entity';
import { WorkReviewDecision } from './work-review-decision.entity';

@Entity('work_reviews')
export class WorkReview {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id!: number;

  @ManyToOne(() => WorkItemEntity, {
    nullable: false,
  })
  @JoinColumn({
    name: 'work_item_id',
  })
  workItem!: WorkItemEntity;

  @Column({
    type: 'enum',
    enum: WorkReviewStatus,
    default: WorkReviewStatus.IN_PROGRESS,
  })
  status!: WorkReviewStatus;

  @Column({
    name: 'current_step',
    default: 1,
  })
  currentStep!: number;

  @Column({
    name: 'submitted_by',
    type: 'bigint',
  })
  submittedBy!: number;

  @Column({
    name: 'submitted_at',
    nullable: true,
  })
  submittedAt?: Date;

  @Column({
    name: 'completed_at',
    nullable: true,
  })
  completedAt?: Date;

  @OneToMany(() => WorkReviewStep, (step) => step.review)
  steps!: WorkReviewStep[];

  @OneToMany(() => WorkReviewDecision, (decision) => decision.review)
  decisions!: WorkReviewDecision[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;
}
