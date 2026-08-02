import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { WorkItemEntity } from '../../work-item/entities/work-item.entity';
import { User } from 'src/features/iam/entities/user.entity';
import { TeamEntity } from 'src/features/org/team/entities/team.entity';
import { AssignmentRole } from '../enum/work-item-assignment.enum';
import { BaseEntity } from 'src/common/base/base.entity';
import { WorkItemAssignmentHistoryEntity } from '../../work-item-assignment-history/entities/work-item-assignment-history.entity';

@Entity({
  name: 'work_item_assignments',
})
export class WorkItemAssignmentEntity extends BaseEntity {
  /**
   * WorkItem
   */
  @ManyToOne(() => WorkItemEntity, (workItem) => workItem.assignments, {
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

  /**
   * Assigned User
   */
  @ManyToOne(() => User, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user?: User;

  @Column({
    type: 'bigint',
    name: 'user_id',
    nullable: true,
  })
  userId?: number;

  /**
   * Assigned Team
   */
  @ManyToOne(() => TeamEntity, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'team_id',
  })
  team?: TeamEntity;

  @Column({
    type: 'bigint',
    name: 'team_id',
    nullable: true,
  })
  teamId?: number;

  /**
   * Assignment Role
   */
  @Column({
    type: 'enum',
    enum: AssignmentRole,
  })
  role!: AssignmentRole;

  @OneToMany(
    () => WorkItemAssignmentHistoryEntity,
    (history) => history.assignment,
  )
  histories!: WorkItemAssignmentHistoryEntity[];

  /**
   * Who assigned
   */
  @ManyToOne(() => User, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'assigned_by',
  })
  assignedByUser!: User;

  @Column({
    type: 'bigint',
    name: 'assigned_by',
  })
  assignedBy!: number;

  /**
   * Assignment time
   */

  @Column({
    type: 'timestamp',
    name: 'assigned_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  assignedAt!: Date;

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
