import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entity/notification.entity';
import { NotificationRepository } from './repository/notification.repository';
import { NotificationService } from './service/notification.service';
import { WorkItemAssignmentNotificationListener } from './listener/work-item-assignment-notification.listener';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],

  providers: [
    NotificationRepository,

    NotificationService,

    WorkItemAssignmentNotificationListener,
  ],

  exports: [NotificationService],
})
export class NotificationModule {}
