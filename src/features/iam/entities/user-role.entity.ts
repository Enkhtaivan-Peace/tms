import { Entity, ManyToOne, JoinColumn, Column, Unique, Index } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity('iam_user_roles')
@Unique(['userId', 'roleId'])
@Index(['userId'])
@Index(['roleId'])
export class UserRole extends BaseEntity {
  @Column({
    name: 'user_id',
  })
  userId!: number;

  @Column({
    name: 'role_id',
  })
  roleId!: number;

  @ManyToOne(() => User, (user) => user.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'role_id',
  })
  role!: Role;
}
