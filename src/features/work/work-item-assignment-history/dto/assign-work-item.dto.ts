import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { AssignmentRole } from '../../work-item-assignment/enum/work-item-assignment.enum';

export class AssignWorkItemDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  teamId?: number;

  @IsEnum(AssignmentRole)
  role!: AssignmentRole;
}
