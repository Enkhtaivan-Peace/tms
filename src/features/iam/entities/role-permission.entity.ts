import { Entity, Column, ManyToOne, JoinColumn, Unique, Index } from 'typeorm';

import { BaseEntity } from '../../../common/base/base.entity';

import { Role } from './role.entity';

import { Permission } from './permission.entity';

@Entity('role_permissions')
@Unique(['roleId', 'permissionId'])
@Index(['roleId'])
@Index(['permissionId'])
export class RolePermission extends BaseEntity {
  @Column({
    name: 'role_id',
  })
  roleId!: number;

  @Column({
    name: 'permission_id',
  })
  permissionId!: number;

  @ManyToOne(() => Role, (role) => role.rolePermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'role_id',
  })
  role!: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'permission_id',
  })
  permission!: Permission;
}
