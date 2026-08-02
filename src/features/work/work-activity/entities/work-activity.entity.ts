import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from 'src/common/base/base.entity';

import { WorkItemEntity } from '../../work-item/entities/work-item.entity';

import { User } from 'src/features/iam/entities/user.entity';

import { WorkActivityAction } from '../enums/work-activity-action.enum';

@Entity({
  name: 'work_activities',
})
export class WorkActivityEntity extends BaseEntity {
  /**
   * Work Item
   */
  @Column({
    name: 'work_item_id',
    type: 'bigint',
  })
  workItemId!: number;

  @ManyToOne(() => WorkItemEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'work_item_id',
  })
  workItem!: WorkItemEntity;

  /**
   * Activity
   */
  @Column({
    type: 'enum',
    enum: WorkActivityAction,
  })
  action!: WorkActivityAction;

  /**
   * Updated field
   */
  @Column({
    name: 'field_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  fieldName?: string;

  /**
   * Old value
   */
  @Column({
    name: 'old_value',
    type: 'json',
    nullable: true,
  })
  oldValue?: Record<string, unknown>;

  @Column({
    name: 'new_value',
    type: 'json',
    nullable: true,
  })
  newValue?: Record<string, unknown>;

  /**
   * Description
   */
  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  /**
   * Actor
   */
  @Column({
    name: 'actor_id',
    type: 'bigint',
  })
  actorId!: number;

  @ManyToOne(() => User, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'actor_id',
  })
  actor!: User;

  /**
   * Audit
   */

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
