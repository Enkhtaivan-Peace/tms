import { BaseEntity } from 'src/common/base/base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
  IsNull,
} from 'typeorm';
import { DepartmentEntity } from '../../department/entities/department.entity';
import { TeamStatus } from '../enums/team-status.enum';
import { TeamMemberEntity } from './team-member.entity';

@Entity('org_teams')
export class TeamEntity extends BaseEntity {
  @Column({
    name: 'department_id',
    type: 'bigint',
  })
  departmentId!: number;

  @ManyToOne(() => DepartmentEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'department_id',
  })
  department!: DepartmentEntity;

  @Column({
    length: 50,
  })
  code?: string;

  @Column({
    length: 200,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  /**
   * Team leader
   */
  @Column({
    name: 'manager_id',
    type: 'bigint',
    nullable: true,
  })
  managerId?: number;

  @Column({
    type: 'enum',
    enum: TeamStatus,
    default: TeamStatus.ACTIVE,
  })
  status!: TeamStatus;

  @OneToMany(() => TeamMemberEntity, (member) => member.team, {
    cascade: true,
  })
  members?: TeamMemberEntity[];
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
