import { IsBoolean, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { NotificationType } from '../enum/notification-type.enum';

export class NotificationFilterDto {
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
