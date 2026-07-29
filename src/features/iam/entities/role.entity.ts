import {
  Entity,
  Column,
  OneToMany,
  Index,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { BaseEntity } from '../../../common/base/base.entity';
import { RolePermission } from './role-permission.entity';
import { UserRole } from './user-role.entity';

@Entity('iam_roles')
@Index(['code'], { unique: true })
@Index(['isSystem'])
export class Role extends BaseEntity {
  @Column({
    unique: true,
    length: 100,
  })
  name!: string;

  @Column({
    length: 100,
  })
  code!: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description?: string;

  @Column({
    name: 'is_system',
    default: false,
  })
  isSystem!: boolean;

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

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles!: UserRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions?: RolePermission[];
}
