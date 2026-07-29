import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { DepartmentService } from '../services/department.service';

import { CreateDepartmentDto } from '../dto/create-department.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly service: DepartmentService) {}

  @Post()
  create(
    @Body()
    dto: CreateDepartmentDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query()
    query: any,
  ) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: number,
  ) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: number,

    @Body()
    dto: any,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: number,
  ) {
    return this.service.remove(id);
  }
}
