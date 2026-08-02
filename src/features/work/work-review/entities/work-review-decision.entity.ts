import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { WorkReviewStep } from './work-review-step.entity';

import { ReviewDecision } from '../enums/review-decision.enum';

@Entity('work_review_decisions')
export class WorkReviewDecision {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id!: number;

  @ManyToOne(() => WorkReviewStep, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'review_step_id',
  })
  reviewStep!: WorkReviewStep;

  @Column({
    type: 'enum',
    enum: ReviewDecision,
  })
  decision!: ReviewDecision;

  @Column({
    type: 'text',
    nullable: true,
  })
  comment?: string;

  @Column({
    name: 'decided_by',
    type: 'bigint',
  })
  decidedBy!: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;
}
