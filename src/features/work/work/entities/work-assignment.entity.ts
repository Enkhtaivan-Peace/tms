import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { WorkItemEntity } from './work-item.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('work_assignments')
export class WorkAssignmentEntity extends BaseEntity {
  @Column({
    name: 'work_item_id',
    type: 'bigint',
  })
  workItemId!: number;

  @ManyToOne(() => WorkItemEntity, (workItem) => workItem.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'work_item_id',
  })
  workItem!: WorkItemEntity;

  /**
   * Team assignment
   */
  @Column({
    name: 'assigned_team_id',
    type: 'bigint',
    nullable: true,
  })
  assignedTeamId?: number;

  /**
   * Direct user assignment
   */
  @Column({
    name: 'assigned_user_id',
    type: 'bigint',
    nullable: true,
  })
  assignedUserId?: number;

  /**
   * Who assigned
   */
  @Column({
    name: 'assigned_by',
    type: 'bigint',
  })
  assignedBy?: number;

  @Column({
    name: 'comment',
    type: 'text',
    nullable: true,
  })
  comment?: string;

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
    nullable: true,
  })
  deletedAt?: Date;

  @VersionColumn({
    name: 'version',
  })
  version!: number;
}
