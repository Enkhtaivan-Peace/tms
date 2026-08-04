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
  UseGuards,
} from '@nestjs/common';

import { WorkItemService } from '../services/work-item.service';

import { CreateWorkItemDto } from '../dto/create-work-item.dto';

import { UpdateWorkItemDto } from '../dto/update-work-item.dto';

import { QueryWorkItemDto } from '../dto/query-work-item.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/features/iam/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
    @CurrentUser('sub')
    userId: number,
    @Body()
    body: {
      statusId: number;
    },
  ) {
    return this.service.updateStatus(id, body.statusId, userId);
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
    @CurrentUser('sub')
    userId: number,
  ) {
    return this.service.update(id, dto, userId);
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
    @CurrentUser('sub')
    userId: number,
  ) {
    return this.service.remove(id, userId);
  }
}
