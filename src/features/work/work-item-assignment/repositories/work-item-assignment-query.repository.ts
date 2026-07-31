import { Injectable } from '@nestjs/common';

import { Repository, IsNull } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { WorkTypeEntity } from '../entities/work-item-assignment.entity';

import { QueryWorkTypeDto } from '../dto/change-assignment-role.dto.ts';

@Injectable()
export class WorkTypeQueryRepository {
  constructor(
    @InjectRepository(WorkTypeEntity)
    private readonly repository: Repository<WorkTypeEntity>,
  ) {}

  async findAll(query: QueryWorkTypeDto) {
    const {
      page = 1,

      limit = 20,

      search,

      isActive,

      sortBy = 'sortOrder',

      sortDirection = 'ASC',
    } = query;

    const where: any = {
      deletedAt: IsNull(),
    };

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const [data, total] = await this.repository.findAndCount({
      where,

      skip: (page - 1) * limit,

      take: limit,

      order: {
        [sortBy]: sortDirection,
      },
    });

    let result = data;

    if (search) {
      const keyword = search.toLowerCase();

      result = data.filter(
        (item) =>
          item.code.toLowerCase().includes(keyword) ||
          item.name.toLowerCase().includes(keyword),
      );
    }

    return {
      data: result,

      meta: {
        page,

        limit,

        total,

        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findActive(): Promise<WorkTypeEntity[]> {
    return this.repository.find({
      where: {
        isActive: true,

        deletedAt: IsNull(),
      },

      order: {
        sortOrder: 'ASC',
      },
    });
  }
}
