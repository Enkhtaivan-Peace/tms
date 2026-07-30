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

import { WorkCategoryService } from '../services/work-category.service';

import { CreateWorkCategoryDto } from '../dto/create-work-category.dto';

import { UpdateWorkCategoryDto } from '../dto/update-work-category.dto';

import { QueryWorkCategoryDto } from '../dto/query-work-category.dto';

@Controller('work/categories')
export class WorkCategoryController {
  constructor(private readonly service: WorkCategoryService) {}

  @Post()
  create(
    @Body()
    dto: CreateWorkCategoryDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query()
    query: QueryWorkCategoryDto,
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
    dto: UpdateWorkCategoryDto,
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
