import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { WorkStatusService } from '../services/work-status.service';

import { CreateWorkStatusDto } from '../dto/create-work-status.dto';

import { UpdateWorkStatusDto } from '../dto/update-work-status.dto';

import { QueryWorkStatusDto } from '../dto/query-work-status.dto';

@Controller('work/statuses')
export class WorkStatusController {
  constructor(private readonly service: WorkStatusService) {}

  @Post()
  create(
    @Body()
    dto: CreateWorkStatusDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query()
    query: QueryWorkStatusDto,
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

  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateWorkStatusDto,
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
}
