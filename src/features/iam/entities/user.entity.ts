import {
  Entity,
  Column,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { BaseEntity } from '../../../common/base/base.entity';

import { UserStatus } from 'src/common/helpers/enums/user-status.enum';
import { UserRole } from './user-role.entity';
import { UserSession } from './user-session.entity';
import { WorkCommentEntity } from 'src/features/work/work-comment/entities/work-comment.entity';
import { NotificationEntity } from 'src/features/notification/entity/notification.entity';

@Entity('iam_users')
export class User extends BaseEntity {
  @Column({
    unique: true,
    length: 100,
  })
  username!: string;

  @Column({
    unique: true,
    length: 255,
  })
  email!: string;

  @Column({
    name: 'password_hash',
    length: 255,
  })
  passwordHash!: string;

  @Column({
    name: 'first_name',
    length: 100,
    nullable: true,
  })
  firstName?: string;

  @Column({
    name: 'last_name',
    length: 100,
    nullable: true,
  })
  lastName?: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Column({
    name: 'last_login_at',
    nullable: true,
  })
  lastLoginAt?: Date;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive!: boolean;

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

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles?: UserRole[];

  @OneToMany(() => UserSession, (session) => session.user)
  sessions!: UserSession[];

  @OneToMany(() => WorkCommentEntity, (comment) => comment.author)
  comments!: WorkCommentEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.recipient)
  notifications!: NotificationEntity[];
}
