import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { WorkItemAssignmentService } from '../services/work-item-assignment.service';

import { AssignWorkItemDto } from '../dto/assign-work-item.dto';

import { ChangeAssignmentRoleDto } from '../dto/change-assignment-role.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('work-items/:workItemId/assignments')
export class WorkItemAssignmentController {
  constructor(private readonly service: WorkItemAssignmentService) {}

  /**
   * Get assignments
   */
  @Get()
  async findAll(
    @Param('workItemId', ParseIntPipe)
    workItemId: number,
  ) {
    return this.service.findByWorkItem(workItemId);
  }

  /* Assign user/team */
  @Post()
  async assign(
    @Param('workItemId', ParseIntPipe)
    workItemId: number,
    @Body()
    dto: AssignWorkItemDto,

    @CurrentUser('sub')
    userId: number,
  ) {
    return this.service.assign(workItemId, dto, userId);
  }

  /**
   * Change role
   */
  @Patch(':assignmentId/role')
  async changeRole(
    @Param('assignmentId', ParseIntPipe)
    assignmentId: number,
    @CurrentUser('sub') userId: number,
    @Body()
    dto: ChangeAssignmentRoleDto,
  ) {
    return this.service.changeRole(assignmentId, dto, userId);
  }

  /**
   * Remove assignment
   */
  @Delete(':assignmentId')
  async remove(
    @Param('assignmentId', ParseIntPipe)
    assignmentId: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.service.remove(assignmentId, userId);
  }
}
