import {
  Repository,
  IsNull,
  Like,
  FindOptionsWhere,
  FindOptionsOrder,
  FindOptionsRelations,
} from 'typeorm';

import { PaginationDto, SortOrder } from '../dto/pagination.dto';

export abstract class BaseQueryRepository<
  T extends {
    deletedAt?: Date;
  },
> {
  constructor(protected readonly repository: Repository<T>) {}

  async paginate(options: {
    filter: PaginationDto;

    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];

    searchFields?: (keyof T)[];

    defaultSort?: string;

    relations?: FindOptionsRelations<T>;
  }) {
    const {
      filter,

      where,

      searchFields = [],

      defaultSort = 'id',

      relations,
    } = options;

    const page = Number(filter.page ?? 1);

    const limit = Number(filter.limit ?? 20);

    const skip = (page - 1) * limit;

    let conditions: any;

    const baseCondition: any = {
      deletedAt: IsNull(),
    };

    if (where) {
      Object.assign(baseCondition, where);
    }

    if (filter.search && searchFields.length) {
      conditions = searchFields.map((field) => ({
        ...baseCondition,

        [field]: Like(`%${filter.search}%`),
      }));
    } else {
      conditions = baseCondition;
    }

    const sortBy = filter.sortBy ?? defaultSort;

    const sortOrder = filter.sortOrder ?? SortOrder.ASC;

    const [data, total] = await this.repository.findAndCount({
      where: conditions,

      skip,

      take: limit,

      order: {
        [sortBy]: sortOrder,
      } as FindOptionsOrder<T>,

      relations,
    });

    return {
      data,

      meta: {
        total,

        page,

        limit,

        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
