import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { WorkItemService } from '../services/work-item.service';

import { CreateWorkItemDto } from '../dto/create-work-item.dto';

@Controller('work-items')
export class WorkItemController {
  constructor(private service: WorkItemService) {}

  @Post()
  create(
    @Body()
    dto: CreateWorkItemDto,
  ) {
    return this.service.create(dto, 1);
  }

  @Get('department/:id')
  findDepartment(
    @Param('id')
    id: number,
  ) {
    return this.service.findByDepartment(id);
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
