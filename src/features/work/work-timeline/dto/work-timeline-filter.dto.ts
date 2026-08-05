import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsDateString,
} from 'class-validator';

import { Transform } from 'class-transformer';
import { TimelineEventType } from './timeline-event-type.enum';

export class WorkTimelineFilterDto {
  @IsInt()
  @IsPositive()
  workItemId!: number;

  @IsOptional()
  @IsEnum(TimelineEventType)
  eventType?: TimelineEventType;

  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  page = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  limit = 20;
}
