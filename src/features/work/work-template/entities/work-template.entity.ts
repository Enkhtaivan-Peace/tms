import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/common/base/base.entity';

import { WorkTypeEntity } from '../../work-type/entities/work-type.entity';

import { WorkCategoryEntity } from '../../work-category/entities/work-category.entity';

import { WorkStatusEntity } from '../../work-status/entities/work-status.entity';
import { WorkTemplateStatusEntity } from '../../work-template-status/entities/work-template-status.entity';

@Entity({
  name: 'work_templates',
})
export class WorkTemplateEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  code!: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  /**
   * Work Type
   */
  @Column({
    name: 'work_type_id',
    type: 'bigint',
  })
  workTypeId!: number;

  @ManyToOne(() => WorkTypeEntity)
  @JoinColumn({
    name: 'work_type_id',
  })
  workType!: WorkTypeEntity;

  /**
   * Work Category
   */
  @Column({
    name: 'work_category_id',
    type: 'bigint',
    nullable: true,
  })
  workCategoryId?: number;

  @ManyToOne(() => WorkCategoryEntity)
  @JoinColumn({
    name: 'work_category_id',
  })
  workCategory?: WorkCategoryEntity;

  @OneToMany(() => WorkTemplateStatusEntity, (status) => status.workTemplate)
  statuses!: WorkTemplateStatusEntity[];

  /**
   * Sequence key
   *
   * TASK_SEQUENCE
   */
  @Column({
    name: 'sequence_key',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  sequenceKey?: string;

  /**
   * Initial workflow status
   */
  @Column({
    name: 'initial_status_id',
    type: 'bigint',
  })
  initialStatusId!: number;

  @ManyToOne(() => WorkStatusEntity)
  @JoinColumn({
    name: 'initial_status_id',
  })
  initialStatus!: WorkStatusEntity;

  /**
   * Default priority
   */
  @Column({
    name: 'default_priority',
    type: 'varchar',
    length: 20,
    default: 'MEDIUM',
  })
  defaultPriority!: string;

  /**
   * Default estimate
   */
  @Column({
    name: 'default_estimated_hours',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  defaultEstimatedHours!: number;

  /**
   * Due date calculation
   *
   * Example:
   * +7 days
   */
  @Column({
    name: 'default_due_days',
    type: 'int',
    default: 0,
  })
  defaultDueDays!: number;

  /**
   * Rules
   */
  @Column({
    name: 'allow_attachment',
    type: 'boolean',
    default: true,
  })
  allowAttachment!: boolean;

  @Column({
    name: 'allow_comment',
    type: 'boolean',
    default: true,
  })
  allowComment!: boolean;

  @Column({
    name: 'require_approval',
    type: 'boolean',
    default: false,
  })
  requireApproval!: boolean;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @Column({
    name: 'is_default',
    type: 'boolean',
    default: false,
  })
  isDefault!: boolean;

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
