import {
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { NotificationFilterDto } from '../dto/notification-filter.dto';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { NotificationService } from '../service/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   * Get current user notifications
   *
   * GET /notifications
   */
  @Get()
  async findMyNotifications(
    @CurrentUser('sub') userId: number,

    @Query() filter: NotificationFilterDto,
  ) {
    return this.notificationService.findMyNotifications(userId, filter);
  }

  /**
   * Get unread notification count
   *
   * GET /notifications/unread-count
   */
  @Get('unread-count')
  async unreadCount(@CurrentUser() user: any) {
    return this.notificationService.unreadCount(user.id);
  }

  /**
   * Mark notification as read
   *
   * PATCH /notifications/:id/read
   */
  @Patch(':id/read')
  async markRead(
    @CurrentUser() user: any,

    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.notificationService.markRead(id, user.id);
  }

  /**
   * Mark all notifications as read
   *
   * PATCH /notifications/read-all
   */
  @Patch('read-all')
  async markAllRead(@CurrentUser() user: any) {
    return this.notificationService.markAllRead(user.id);
  }
}
