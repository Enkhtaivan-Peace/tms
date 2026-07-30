import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { WorkStatusTransitionService } from '../services/work-status-transition.service';

import { CreateWorkStatusTransitionDto } from '../dto/create-work-status-transition.dto';

import { UpdateWorkStatusTransitionDto } from '../dto/update-work-status-transition.dto';

import { QueryWorkStatusTransitionDto } from '../dto/query-work-status-transition.dto';

@Controller('work/status-transitions')
export class WorkStatusTransitionController {
  constructor(private readonly service: WorkStatusTransitionService) {}

  /**
   * Create transition
   *
   * POST /work/status-transitions
   */
  @Post()
  async create(@Body() dto: CreateWorkStatusTransitionDto) {
    return this.service.create(dto);
  }

  /**
   * Get list
   *
   * GET /work/status-transitions
   */
  @Get()
  async findAll(@Query() query: QueryWorkStatusTransitionDto) {
    return this.service.findAll(query);
  }

  /**
   * Get detail
   *
   * GET /work/status-transitions/:id
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findOne(id);
  }

  /**
   * Update transition
   *
   * PATCH /work/status-transitions/:id
   */
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateWorkStatusTransitionDto,
  ) {
    return this.service.update(id, dto);
  }

  /**
   * Delete transition
   *
   * DELETE /work/status-transitions/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    await this.service.remove(id);
  }
}
