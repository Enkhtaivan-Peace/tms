import { BaseEntity } from 'src/common/base/base.entity';

import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
} from 'typeorm';

import { TeamEntity } from '../../team/entities/team.entity';

import { TeamMemberRole } from '../enums/team-member-role.enum';
import { TeamMemberStatus } from '../enums/team-status.enum';

@Entity('org_team_members')
export class TeamMemberEntity extends BaseEntity {
  @Column({
    name: 'team_id',
    type: 'bigint',
  })
  teamId!: number;

  @ManyToOne(() => TeamEntity, (team) => team.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'team_id',
  })
  team!: TeamEntity;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId!: number;

  @Column({
    type: 'enum',
    enum: TeamMemberRole,
    default: TeamMemberRole.MEMBER,
  })
  role!: TeamMemberRole;

  @Column({
    type: 'enum',
    enum: TeamMemberStatus,
    default: TeamMemberStatus.ACTIVE,
  })
  status!: TeamMemberStatus;

  /*
   * Audit columns
   */

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
