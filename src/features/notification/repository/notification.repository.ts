import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository, IsNull } from 'typeorm';

import { BaseRepository } from 'src/common/base/base.repository';

import { NotificationFilterDto } from '../dto/notification-filter.dto';
import { NotificationEntity } from '../entity/notification.entity';

@Injectable()
export class NotificationRepository extends BaseRepository<NotificationEntity> {
  constructor(
    @InjectRepository(NotificationEntity)
    repository: Repository<NotificationEntity>,
  ) {
    super(repository);
  }

  /**
   * User notification list
   */
  async findByUser(userId: number, filter?: NotificationFilterDto) {
    const page = filter?.page ?? 1;

    const limit = filter?.limit ?? 20;

    const skip = (page - 1) * limit;

    const qb = this.queryBuilder('notification');

    qb.where(
      `
 notification.recipient_id = :userId
 `,
      {
        userId,
      },
    );

    qb.andWhere(
      `
 notification.deleted_at IS NULL
 `,
    );

    if (filter?.type) {
      qb.andWhere(
        `
   notification.type = :type
   `,
        {
          type: filter.type,
        },
      );
    }

    if (filter?.isRead !== undefined) {
      qb.andWhere(
        `
   notification.is_read = :isRead
   `,
        {
          isRead: filter.isRead,
        },
      );
    }

    qb.orderBy('notification.created_at', 'DESC');

    qb.skip(skip);

    qb.take(limit);

    return qb.getManyAndCount();
  }

  /**
   * Unread notification count
   */
  async countUnread(userId: number) {
    return this.count({
      recipientId: userId,

      isRead: false,

      deletedAt: IsNull(),
    });
  }

  /**
   * Find one user notification
   */
  async findUserNotification(id: number, userId: number) {
    return this.findOne({
      id,

      recipientId: userId,

      deletedAt: IsNull(),
    });
  }

  /**
   * Mark all read
   */
  async markAllRead(userId: number) {
    return this.updateWhere(
      {
        recipientId: userId,

        isRead: false,

        deletedAt: IsNull(),
      },

      {
        isRead: true,

        readAt: new Date(),
      },
    );
  }
}
