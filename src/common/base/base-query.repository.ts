import {
  Repository,
  FindOptionsWhere,
  FindOptionsOrder,
  IsNull,
  Like,
} from 'typeorm';

import { PaginationDto, SortOrder } from '../dto/pagination.dto';

export abstract class BaseQueryRepository<
  T extends {
    deletedAt?: Date;
  },
> {
  constructor(protected readonly repository: Repository<T>) {}

  /**
   * Standard pagination
   */
  async paginate(options: {
    filter: PaginationDto;

    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];

    searchFields?: (keyof T)[];

    defaultSort?: string;
  }) {
    const { filter, where, searchFields = [], defaultSort = 'id' } = options;

    const page = Number(filter.page ?? 1);

    const limit = Number(filter.limit ?? 20);

    const skip = (page - 1) * limit;

    let conditions: any;

    /**
     * Soft delete
     */
    const baseCondition: any = {
      deletedAt: IsNull(),
    };

    /**
     * merge filter
     */
    if (where) {
      Object.assign(baseCondition, where);
    }

    /**
     * Search
     */
    if (filter.search && searchFields.length) {
      conditions = searchFields.map((field) => ({
        ...baseCondition,

        [field]: Like(`%${filter.search}%`),
      }));
    } else {
      conditions = baseCondition;
    }

    /**
     * Sort
     */
    const sortBy = (filter.sortBy ?? defaultSort) as keyof T;

    const sortOrder = filter.sortOrder ?? SortOrder.ASC;

    const order: FindOptionsOrder<T> = {
      [sortBy]: sortOrder,
    } as FindOptionsOrder<T>;

    const [data, total] = await this.repository.findAndCount({
      where: conditions,

      skip,

      take: limit,

      order,
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
