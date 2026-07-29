import { Entity, Column, OneToMany, Index } from 'typeorm';

import { BaseEntity } from '../../../common/base/base.entity';
import { RolePermission } from './role-permission.entity';
import { UserRole } from './user-role.entity';
import { AuditColumns } from 'src/common/base/audit.columns';

@Entity('roles')
@Index(['code'])
@Index(['isSystem'])
export class Role extends BaseEntity {
  @Column({
    unique: true,
    length: 100,
  })
  name!: string;

  @Column({
    unique: true,
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

  @Column(() => AuditColumns, {
    prefix: '',
  })
  audit!: AuditColumns;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles!: UserRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions?: RolePermission[];
}
