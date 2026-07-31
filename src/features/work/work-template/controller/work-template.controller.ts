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

import { WorkTemplateService } from '../services/work-template.service';

import { CreateWorkTemplateDto } from '../dto/create-work-template.dto';

import { UpdateWorkTemplateDto } from '../dto/update-work-template.dto';

import { QueryWorkTemplateDto } from '../dto/query-work-template.dto';

@Controller('work-templates')
export class WorkTemplateController {
  constructor(private readonly service: WorkTemplateService) {}

  /**
   * Create
   *
   * POST /work-templates
   */
  @Post()
  create(
    @Body()
    dto: CreateWorkTemplateDto,
  ) {
    return this.service.create(dto);
  }

  /**
   * List
   *
   * GET /work-templates
   */
  @Get()
  findAll(
    @Query()
    query: QueryWorkTemplateDto,
  ) {
    return this.service.findAll(query);
  }

  /**
   * Detail
   *
   * GET /work-templates/:id
   */
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findOne(id);
  }

  /**
   * Update
   *
   * PATCH /work-templates/:id
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateWorkTemplateDto,
  ) {
    return this.service.update(id, dto);
  }

  /**
   * Delete
   *
   * DELETE /work-templates/:id
   */
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.remove(id);
  }
}
