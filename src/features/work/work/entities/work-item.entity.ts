import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { WorkStatus } from '../enums/work-status.enum';
import { WorkPriority } from '../enums/work-priority.enum';
import { WorkType } from '../enums/work-type.enum';
import { WorkAssignmentEntity } from './work-assignment.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('work_items')
export class WorkItemEntity extends BaseEntity {
  /**
   * Department owner
   */
  @Column({
    name: 'department_id',
    type: 'bigint',
  })
  departmentId!: number;

  @Column({
    length: 200,
  })
  title!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'enum',
    enum: WorkType,
    default: WorkType.REQUEST,
  })
  type!: WorkType;

  @Column({
    type: 'enum',
    enum: WorkPriority,
    default: WorkPriority.NORMAL,
  })
  priority!: WorkPriority;

  @Column({
    type: 'enum',
    enum: WorkStatus,
    default: WorkStatus.NEW,
  })
  status!: WorkStatus;

  /**
   * Creator user
   */
  @Column({
    name: 'created_by',
    type: 'bigint',
  })
  createdBy!: number;

  @OneToMany(() => WorkAssignmentEntity, (assignment) => assignment.workItem)
  assignments?: WorkAssignmentEntity[];

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
