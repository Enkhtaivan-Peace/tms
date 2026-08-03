import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '../repository/notification.repository';

import { NotificationType } from '../enum/notification-type.enum';

@Injectable()
export class NotificationService {
  constructor(private readonly repository: NotificationRepository) {}

  async create({
    receiverId,
    type,
    title,
    message,
    payload,
  }: {
    receiverId: number;
    type: NotificationType;
    title: string;
    message: string;
    payload?: any;
  }) {
    return this.repository.create({
      receiverId,
      type,
      title,
      message,
      payload,
    });
  }

  async markAsRead(id: number) {
    return this.repository.update(id, {
      isRead: true,
      readAt: new Date(),
    });
  }
}
