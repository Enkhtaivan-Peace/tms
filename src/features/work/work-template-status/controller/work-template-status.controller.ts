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

import { WorkTemplateStatusService } from '../services/work-template-status.service';

import { CreateWorkTemplateStatusDto } from '../dto/create-work-template-status.dto';

import { UpdateWorkTemplateStatusDto } from '../dto/update-work-template-status.dto';

import { QueryWorkTemplateStatusDto } from '../dto/query-work-template-status.dto';

@Controller('work/template-statuses')
export class WorkTemplateStatusController {
  constructor(private readonly service: WorkTemplateStatusService) {}

  @Post()
  create(
    @Body()
    dto: CreateWorkTemplateStatusDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query()
    query: QueryWorkTemplateStatusDto,
  ) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateWorkTemplateStatusDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.remove(id);
  }

  @Get('template/:templateId/initial')
  getInitialStatus(
    @Param('templateId', ParseIntPipe)
    templateId: number,
  ) {
    return this.service.getInitialStatus(templateId);
  }
}
