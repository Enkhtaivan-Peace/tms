import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '../repository/notification.repository';

import { NotificationType } from '../enum/notification-type.enum';

@Injectable()
export class NotificationService {
  constructor(private readonly repository: NotificationRepository) {}

  async create(
    receiverId: number,

    type: NotificationType,

    title: string,

    message: string,

    payload?: any,
  ) {
    return this.repository.create({
      receiverId,

      type,

      title,

      message,

      payload,
    });
  }
}
