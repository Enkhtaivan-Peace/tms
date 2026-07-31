import { IsEnum } from 'class-validator';
import { AssignmentRole } from '../enum/work-item-assignment-action.enum';

export class ChangeAssignmentRoleDto {
  @IsEnum(AssignmentRole)
  role!: AssignmentRole;
}
