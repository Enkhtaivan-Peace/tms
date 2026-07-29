import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

import { BaseEntity } from '../../../common/base/base.entity';
import { User } from './user.entity';

@Entity('user_sessions')
@Index(['refreshToken'], { unique: true })
@Index(['userId'])
export class UserSession extends BaseEntity {
  @Column({
    name: 'user_id',
  })
  userId!: number;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 500,
  })
  refreshToken!: string;

  @Column({
    name: 'expires_at',
  })
  expiresAt!: Date;

  @Column({
    default: false,
  })
  revoked!: boolean;

  @Column({
    name: 'ip_address',
    nullable: true,
  })
  ipAddress?: string;

  @Column({
    name: 'user_agent',
    nullable: true,
  })
  userAgent?: string;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;
}
