import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/common/base/base.entity';

import { WorkTypeEntity } from '../../work-type/entities/work-type.entity';
import { WorkCategoryEntity } from '../../work-category/entities/work-category.entity';
import { WorkStatusEntity } from '../../work-status/entities/work-status.entity';

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
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  description?: string;

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

  @Column({
    name: 'work_category_id',
    type: 'bigint',
  })
  workCategoryId!: number;

  @ManyToOne(() => WorkCategoryEntity)
  @JoinColumn({
    name: 'work_category_id',
  })
  workCategory!: WorkCategoryEntity;

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

  @Column({
    name: 'default_priority',
    type: 'varchar',
    length: 20,
    default: 'MEDIUM',
  })
  defaultPriority!: string;

  @Column({
    name: 'estimated_hours',
    type: 'decimal',
    precision: 8,
    scale: 2,
    default: 0,
  })
  estimatedHours!: number;

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
    name: 'is_default',
    type: 'boolean',
    default: false,
  })
  isDefault!: boolean;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @Column({
    name: 'sort_order',
    type: 'int',
    default: 0,
  })
  sortOrder!: number;

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
