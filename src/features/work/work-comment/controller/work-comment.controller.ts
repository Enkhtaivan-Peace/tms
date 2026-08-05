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

import { WorkCommentService } from '../services/work-comment.service';
import { WorkCommentQueryService } from '../services/work-comment-query.service';

import { CreateWorkCommentDto } from '../dto/create-work-comment.dto';
import { UpdateWorkCommentDto } from '../dto/update-work-comment.dto';
import { WorkCommentFilterDto } from '../dto/work-comment-filter.dto';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('work-comments')
export class WorkCommentController {
  constructor(
    private readonly workCommentService: WorkCommentService,

    private readonly workCommentQueryService: WorkCommentQueryService,
  ) {}

  /**
   * Create comment
   */
  @Post()
  async create(@Body() dto: CreateWorkCommentDto, @CurrentUser() user) {
    return this.workCommentService.create(dto, user.id);
  }

  /**
   * Update comment
   */
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,

    @Body() dto: UpdateWorkCommentDto,

    @CurrentUser() user,
  ) {
    return this.workCommentService.update(id, dto, user.id);
  }

  /**
   * Delete comment
   */
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,

    @CurrentUser() user,
  ) {
    return this.workCommentService.remove(id, user.id);
  }

  /**
   * Get comment
   */
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.workCommentService.findById(id);
  }

  /**
   * Get comment thread
   */
  @Get(':id/thread')
  async thread(@Param('id', ParseIntPipe) id: number) {
    return this.workCommentService.getThread(id);
  }

  /**
   * List comments by WorkItem
   */
  @Get()
  async findAll(@Query() filter: WorkCommentFilterDto) {
    return this.workCommentQueryService.findAll(filter);
  }
}
