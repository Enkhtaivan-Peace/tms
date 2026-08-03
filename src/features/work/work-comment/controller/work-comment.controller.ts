import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { WorkCommentService } from '../services/work-comment.service';
import { CreateWorkCommentDto } from '../dto/create-work-comment.dto';

@Controller('work-comments')
export class WorkCommentController {
  constructor(private readonly service: WorkCommentService) {}

  @Post()
  create(@Body() dto: CreateWorkCommentDto, @Req() req: any) {
    return this.service.create(dto, req.user.id);
  }

  @Get('/work-item/:id')
  findByWorkItem(@Param('id') id: number) {
    return this.service.findByWorkItem(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any, @Req() req: any) {
    return this.service.update(Number(id), body.content, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(Number(id));
  }
}
