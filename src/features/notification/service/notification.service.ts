import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateNotificationDto } from '../dto/create-notification.dto';

import { NotificationMapper } from '../mapper/notification.mapper';

import { NotificationFilterDto } from '../dto/notification-filter.dto';
import { NotificationRepository } from '../repository/notification.repository';

@Injectable()
export class NotificationService {
  constructor(private readonly repository: NotificationRepository) {}

  /**
   * Create notification
   */
  async create(dto: CreateNotificationDto) {
    const entity = NotificationMapper.toEntity(dto);

    return this.repository.create(entity);
  }

  /**
   * My notifications
   */
  async findMyNotifications(userId: number, filter: NotificationFilterDto) {
    const [items, total] = await this.repository.findByUser(userId, filter);

    return {
      items,

      meta: {
        total,

        page: filter.page ?? 1,

        limit: filter.limit ?? 20,
      },
    };
  }

  /**
   * unread count
   */
  async unreadCount(userId: number) {
    return {
      count: await this.repository.countUnread(userId),
    };
  }

  /**
   * mark read
   */
  async markRead(id: number, userId: number) {
    const notification = await this.repository.findUserNotification(id, userId);

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return this.repository.update(
      id,

      {
        isRead: true,

        readAt: new Date(),
      },
    );
  }

  /**
   * mark all read
   */
  async markAllRead(userId: number) {
    return this.repository.markAllRead(userId);
  }
}
