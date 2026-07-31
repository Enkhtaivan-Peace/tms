import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/base/base.entity';
import { WorkTemplateEntity } from '../../work-template/entities/work-template.entity';
import { WorkStatusEntity } from '../../work-status/entities/work-status.entity';

@Entity({
  name: 'work_template_statuses',
})
export class WorkTemplateStatusEntity extends BaseEntity {
  @Column({
    name: 'work_template_id',
    type: 'bigint',
  })
  workTemplateId!: number;

  @ManyToOne(() => WorkTemplateEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'work_template_id',
  })
  workTemplate!: WorkTemplateEntity;

  @Column({
    name: 'work_status_id',
    type: 'bigint',
  })
  workStatusId!: number;

  @ManyToOne(() => WorkStatusEntity)
  @JoinColumn({
    name: 'work_status_id',
  })
  workStatus!: WorkStatusEntity;

  /**
   * Template дээрх эхлэх статус
   *
   * Feature template:
   * e.g. initial = true
   *
   */
  @Column({
    name: 'is_initial',
    type: 'boolean',
    default: false,
  })
  isInitial!: boolean;

  /**
   * UI дээр харагдах дараалал
   */
  @Column({
    name: 'sort_order',
    type: 'int',
    default: 0,
  })
  sortOrder!: number;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

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
