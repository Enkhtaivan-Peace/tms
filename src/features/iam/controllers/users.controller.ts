import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  Post,
  Query,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { UserFilterDto } from '../dto/user-filter.dto copy';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(
    @Query()
    filter: UserFilterDto,
  ) {
    return this.usersService.findAll(filter);
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
