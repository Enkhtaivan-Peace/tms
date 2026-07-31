import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { WorkItemAssignmentHistoryService } from '../services/work-item-assignment-history.service';
import { AssignmentHistoryFilterDto } from '../dto/assignment-history-filter.dto';

@Controller('work-item-assignment-history')
export class WorkItemAssignmentHistoryController {
  constructor(private readonly service: WorkItemAssignmentHistoryService) {}

  /**
   * Get history by assignment
   *
   * GET
   * /work-item-assignment-history/assignments/:assignmentId
   */
  @Get('assignments/:assignmentId')
  async findByAssignment(
    @Param('assignmentId', ParseIntPipe)
    assignmentId: number,

    @Query()
    filter: AssignmentHistoryFilterDto,
  ) {
    return this.service.findByAssignment(
      assignmentId,

      filter,
    );
  }

  /**
   * Get history by WorkItem
   *
   * GET
   * /work-item-assignment-history/work-items/:workItemId
   */
  @Get('work-items/:workItemId')
  async findByWorkItem(
    @Param('workItemId', ParseIntPipe)
    workItemId: number,

    @Query()
    filter: AssignmentHistoryFilterDto,
  ) {
    return this.service.findByWorkItem(
      workItemId,

      filter,
    );
  }
}
