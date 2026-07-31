import { IsEnum } from 'class-validator';
import { AssignmentRole } from '../../work-item-assignment/enum/work-item-assignment.enum';

export class ChangeAssignmentRoleDto {
  @IsEnum(AssignmentRole)
  role!: AssignmentRole;
}
