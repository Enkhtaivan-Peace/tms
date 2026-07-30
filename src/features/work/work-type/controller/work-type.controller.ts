import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { WorkTypeService } from '../services/work-type.service';

import { CreateWorkTypeDto } from '../dto/create-work-type.dto';

import { UpdateWorkTypeDto } from '../dto/update-work-type.dto';

import { QueryWorkTypeDto } from '../dto/query-work-type.dto';

@ApiTags('Work Type')
@Controller('work/types')
export class WorkTypeController {
  constructor(private readonly service: WorkTypeService) {}

  /**
   * Create
   */
  @Post()
  @ApiOperation({
    summary: 'Create work type',
  })
  @ApiResponse({
    status: 201,
    description: 'Work type created',
  })
  async create(
    @Body()
    dto: CreateWorkTypeDto,
  ) {
    return this.service.create(dto);
  }

  /**
   * Get list
   */
  @Get()
  @ApiOperation({
    summary: 'Get work types',
  })
  async findAll(
    @Query()
    query: QueryWorkTypeDto,
  ) {
    return this.service.findAll(query);
  }

  /**
   * Get one
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get work type by id',
  })
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findOne(id);
  }

  /**
   * Update
   */
  @Put(':id')
  @ApiOperation({
    summary: 'Update work type',
  })
  async update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateWorkTypeDto,
  ) {
    return this.service.update(id, dto);
  }

  /**
   * Soft delete
   */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete work type',
  })
  async remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.remove(id);
  }
}
