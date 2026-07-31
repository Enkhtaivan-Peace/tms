import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { WorkItemEntity } from '../../work-item/entities/work-item.entity';

import { AssignmentRole } from '../../work-item-assignment/enum/work-item-assignment.enum';
import { WorkItemAssignmentEntity } from '../../work-item-assignment/entities/work-item-assignment.entity';
import { AssignmentHistoryAction } from '../enum/work-item-assignment-action.enum';

@Entity({
  name: 'work_item_assignment_history',
  schema: 'work',
})
export class WorkItemAssignmentHistoryEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: number;

  @ManyToOne(() => WorkItemEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'work_item_id',
  })
  workItem!: WorkItemEntity;

  @Column({
    type: 'bigint',
    name: 'work_item_id',
  })
  workItemId!: number;

  @ManyToOne(() => WorkItemAssignmentEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'assignment_id',
  })
  assignment!: WorkItemAssignmentEntity;

  @Column({
    type: 'bigint',
    name: 'assignment_id',
  })
  assignmentId!: number;

  @Column({
    type: 'enum',
    enum: AssignmentHistoryAction,
  })
  action!: AssignmentHistoryAction;

  @Column({
    type: 'enum',
    enum: AssignmentRole,
    nullable: true,
  })
  oldRole?: AssignmentRole;

  @Column({
    type: 'enum',
    enum: AssignmentRole,
    nullable: true,
  })
  newRole?: AssignmentRole;

  @Column({
    type: 'bigint',
    nullable: true,
    name: 'old_user_id',
  })
  oldUserId?: number;

  @Column({
    type: 'bigint',
    nullable: true,
    name: 'new_user_id',
  })
  newUserId?: number;

  @Column({
    type: 'bigint',
    nullable: true,
    name: 'old_team_id',
  })
  oldTeamId?: number;

  @Column({
    type: 'bigint',
    nullable: true,
    name: 'new_team_id',
  })
  newTeamId?: number;

  @Column({
    type: 'bigint',
    name: 'changed_by',
  })
  changedBy!: number;

  @Column({
    type: 'timestamp',
    name: 'changed_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  changedAt!: Date;

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
}
