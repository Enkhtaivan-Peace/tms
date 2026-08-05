import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { NotificationType } from '../enum/notification-type.enum';
import { NotificationPriority } from '../enum/notification-priority.enum';

export class CreateNotificationDto {
  @IsNumber()
  @IsNotEmpty()
  recipientId!: number;

  @IsEnum(NotificationType)
  type!: NotificationType;

  @IsEnum(NotificationPriority)
  @IsOptional()
  priority?: NotificationPriority;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsOptional()
  @IsString()
  referenceType?: string;

  @IsOptional()
  @IsNumber()
  referenceId?: number;
}
