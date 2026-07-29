import { Entity, Column, OneToMany, Index, Unique } from 'typeorm';

import { BaseEntity } from '../../../common/base/base.entity';
import { RolePermission } from './role-permission.entity';
import { AuditColumns } from 'src/common/base/audit.columns';

@Entity('iam_permissions')
@Index(['code'], { unique: true })
@Unique(['module', 'action'])
export class Permission extends BaseEntity {
  @Column({
    length: 100,
  })
  code!: string;

  @Column({
    length: 100,
  })
  module!: string;

  @Column({
    length: 100,
  })
  action!: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description?: string;

  @Column(() => AuditColumns, {
    prefix: '',
  })
  audit!: AuditColumns;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  rolePermissions?: RolePermission[];
}
