import {
  Entity,
  Column,
  OneToMany,
  Index,
  Unique,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { BaseEntity } from '../../../common/base/base.entity';
import { RolePermission } from './role-permission.entity';

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
  name!: string;

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

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  rolePermissions?: RolePermission[];
}
