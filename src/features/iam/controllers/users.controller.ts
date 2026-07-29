import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  Post,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.usersService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(Number(id));
  }

  @Post(':id/roles/:roleId')
  assignRole(@Param('id') id: number, @Param('roleId') roleId: number) {
    return this.usersService.assignRole(Number(id), Number(roleId));
  }
}
