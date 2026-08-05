import { Injectable } from '@nestjs/common';

import { WorkCommentQueryRepository } from '../repositories/work-comment-query.repository';

import { WorkCommentFilterDto } from '../dto/work-comment-filter.dto';

@Injectable()
export class WorkCommentQueryService {
  constructor(private readonly queryRepository: WorkCommentQueryRepository) {}

  async findAll(filter: WorkCommentFilterDto) {
    return this.queryRepository.findAll(filter);
  }
}
