import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/common/base/base.entity';

import { WorkTemplateEntity } from '../../work-template/entities/work-template.entity';

import { WorkStatusEntity } from '../../work-status/entities/work-status.entity';
import { WorkItemAssignmentEntity } from '../../work-item-assignment/entities/work-item-assignment.entity';

@Entity({
  name: 'work_items',
})
export class WorkItemEntity extends BaseEntity {
  /**
   * Human readable number
   *
   * TASK-00001
   */
  @Column({
    name: 'code',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  code!: string;

  /**
   * Work title
   */
  @Column({
    type: 'varchar',
    length: 255,
  })
  title!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  /**
   * Template reference
   *
   * Feature Template
   */
  @Column({
    name: 'work_template_id',
    type: 'bigint',
  })
  workTemplateId!: number;

  @ManyToOne(() => WorkTemplateEntity)
  @JoinColumn({
    name: 'work_template_id',
  })
  workTemplate!: WorkTemplateEntity;

  /**
   * Current runtime status
   *
   *
   * IN_PROGRESS
   */
  @Column({
    name: 'status_id',
    type: 'bigint',
  })
  statusId!: number;

  @ManyToOne(() => WorkStatusEntity)
  @JoinColumn({
    name: 'status_id',
  })
  status!: WorkStatusEntity;

  /**
   * Priority
   */
  @Column({
    type: 'varchar',
    length: 20,
    default: 'MEDIUM',
  })
  priority!: string;

  /**
   * Planned estimate hours
   */
  @Column({
    name: 'estimated_hours',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  estimatedHours!: number;

  /**
   * Actual spent hours
   */
  @Column({
    name: 'spent_hours',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  spentHours!: number;

  /**
   * Due date
   */
  @Column({
    name: 'due_date',
    type: 'date',
    nullable: true,
  })
  dueDate?: Date;

  @OneToMany(
    () => WorkItemAssignmentEntity,
    (assignment) => assignment.workItem,
  )
  assignments!: WorkItemAssignmentEntity[];

  /**
   * Completed timestamp
   */
  @Column({
    name: 'completed_at',
    type: 'timestamp',
    nullable: true,
  })
  completedAt?: Date;

  @Column({
    name: 'created_by',
    type: 'bigint',
  })
  createdBy!: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;
}
