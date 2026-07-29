import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { PermissionsService } from '../services/permissions.service';

import { CreatePermissionDto } from '../dto/create-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.permissionsService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionsService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.permissionsService.remove(Number(id));
  }
}
