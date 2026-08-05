import { CreateNotificationDto } from '../dto/create-notification.dto';

import { NotificationEntity } from '../entity/notification.entity';
import { NotificationPriority } from '../enum/notification-priority.enum';

export class NotificationMapper {
  static toEntity(dto: CreateNotificationDto): NotificationEntity {
    const entity = new NotificationEntity();

    entity.recipientId = dto.recipientId;

    entity.type = dto.type;

    entity.priority = dto.priority ?? NotificationPriority.NORMAL;

    entity.title = dto.title;

    entity.message = dto.message;

    entity.referenceType = dto.referenceType;

    entity.referenceId = dto.referenceId;

    return entity;
  }
}
