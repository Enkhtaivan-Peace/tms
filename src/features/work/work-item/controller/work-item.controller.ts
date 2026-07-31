import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { WorkItemService } from '../services/work-item.service';

import { CreateWorkItemDto } from '../dto/create-work-item.dto';

import { UpdateWorkItemDto } from '../dto/update-work-item.dto';

import { QueryWorkItemDto } from '../dto/query-work-item.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('work-items')
export class WorkItemController {
  constructor(private readonly service: WorkItemService) {}

  /**
   * Create
   *
   * POST /work-items
   */
  @Post()
  create(@CurrentUser('sub') userId, @Body() dto: CreateWorkItemDto) {
    return this.service.create(dto, userId);
  }

  /**
   * List
   *
   * GET /work-items?page=1&limit=20
   */
  @Get()
  findAll(@Query() query: QueryWorkItemDto) {
    return this.service.findAll(query);
  }

  /**
   * Detail
   *
   * GET /work-items/:id
   */
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findOne(id);
  }

  /**
   * Change status
   *
   * PATCH /work-items/:id/status
   */
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    body: {
      statusId: number;
    },
  ) {
    return this.service.updateStatus(
      id,

      body.statusId,
    );
  }

  /**
   * Update
   *
   * PATCH /work-items/:id
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateWorkItemDto,
  ) {
    return {
      message: 'Update work item - next implementation',

      id,

      dto,
    };
  }

  /**
   * Delete
   *
   * DELETE /work-items/:id
   */
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.remove(id);
  }
}
