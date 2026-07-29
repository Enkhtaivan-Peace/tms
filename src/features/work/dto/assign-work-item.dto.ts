import { IsNumber, IsOptional } from 'class-validator';

export class AssignWorkItemDto {
  @IsOptional()
  @IsNumber()
  teamId?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  comment?: string;
}
