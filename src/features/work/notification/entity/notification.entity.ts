import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { NotificationType } from '../enum/notification-type.enum';

@Entity({
  name: 'notifications',
  schema: 'notification',
})
@Index(['receiverId', 'isRead', 'createdAt'])
export class NotificationEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: number;

  @Column({
    type: 'bigint',
    name: 'receiver_id',
  })
  receiverId!: number;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type!: NotificationType;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title!: string;

  @Column({
    type: 'text',
  })
  message!: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  payload?: Record<string, any>;

  @Column({
    name: 'is_read',
    type: 'boolean',
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
    nullable: true,
  })
  deletedAt?: Date;
}
