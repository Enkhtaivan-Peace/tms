export class WorkTimelineItemDto {
  id!: number;
  type!: string;
  message!: string;
  actorId?: number;
  data?: Record<string, any>;
  createdAt!: Date;
}
