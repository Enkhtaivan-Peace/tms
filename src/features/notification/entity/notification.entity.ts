import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import { BaseEntity } from 'src/common/base/base.entity';

import { NotificationType } from '../enum/notification-type.enum';
import { NotificationPriority } from '../enum/notification-priority.enum';
import { User } from 'src/features/iam/entities/user.entity';

@Entity('notifications')
export class NotificationEntity extends BaseEntity {
  @ManyToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'recipient_id',
  })
  recipient!: User;

  @Column({
    name: 'recipient_id',
    type: 'bigint',
  })
  recipientId!: number;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type!: NotificationType;

  @Column({
    type: 'enum',
    enum: NotificationPriority,
    default: NotificationPriority.NORMAL,
  })
  priority!: NotificationPriority;

  @Column({
    length: 255,
  })
  title!: string;

  @Column({
    type: 'text',
  })
  message!: string;

  @Column({
    name: 'reference_type',
    nullable: true,
  })
  referenceType?: string;

  @Column({
    name: 'reference_id',
    type: 'bigint',
    nullable: true,
  })
  referenceId?: number;

  @Column({
    name: 'is_read',
    default: false,
  })
  isRead!: boolean;

  @Column({
    name: 'read_at',
    nullable: true,
  })
  readAt?: Date;

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
  })
  deletedAt?: Date;
}
