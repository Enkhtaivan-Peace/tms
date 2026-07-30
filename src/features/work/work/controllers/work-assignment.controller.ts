import { Controller, Post, Get, Body, Param } from '@nestjs/common';

import { WorkAssignmentService } from '../services/work-assignment.service';

import { AssignWorkItemDto } from '../dto/assign-work-item.dto';

@Controller('work-items/:id/assignments')
export class WorkAssignmentController {
  constructor(private service: WorkAssignmentService) {}

  @Post()
  assign(
    @Param('id')
    id: number,

    @Body()
    dto: AssignWorkItemDto,
  ) {
    return this.service.assign(id, dto, 1);
  }

  @Get()
  history(
    @Param('id')
    id: number,
  ) {
    return this.service.history(id);
  }
}
