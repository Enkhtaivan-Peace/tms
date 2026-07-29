import {
  Repository,
  ObjectLiteral,
  FindOptionsWhere,
  DeepPartial,
  FindOptionsRelations,
  QueryDeepPartialEntity,
  EntityManager,
  SelectQueryBuilder,
} from 'typeorm';

export interface PaginationOptions {
  page: number;

  limit: number;

  search?: string;
}

export interface PaginatedResult<T> {
  data: T[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export abstract class BaseRepository<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  /**
   * Find all
   */
  async findAll(options?: {
    where?: FindOptionsWhere<T>;

    relations?: FindOptionsRelations<T>;
  }): Promise<T[]> {
    return this.repository.find({
      where: options?.where,

      relations: options?.relations,
    });
  }

  /**
   * Find one
   */
  async findOne(
    where: FindOptionsWhere<T>,

    relations?: FindOptionsRelations<T>,
  ): Promise<T | null> {
    return this.repository.findOne({
      where,

      relations,
    });
  }

  /**
   * Find by primary key
   */
  async findById(
    id: number,

    relations?: FindOptionsRelations<T>,
  ): Promise<T | null> {
    return this.repository.findOne({
      where: {
        id: id as any,
      },

      relations,
    });
  }

  /**
   * Exists check
   */
  async exists(where: FindOptionsWhere<T>): Promise<boolean> {
    const count = await this.repository.count({
      where,
    });

    return count > 0;
  }

  /**
   * Create
   */
  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);

    return this.repository.save(entity);
  }

  /**
   * Bulk insert
   */
  async createMany(data: DeepPartial<T>[]): Promise<T[]> {
    const entities = this.repository.create(data);

    return this.repository.save(entities);
  }

  /**
   * Update by id
   */
  async update(
    id: number,

    data: QueryDeepPartialEntity<T>,
  ): Promise<T | null> {
    await this.repository.update(id, data);

    return this.findById(id);
  }

  /**
   * Update by condition
   */
  async updateWhere(
    where: FindOptionsWhere<T>,

    data: QueryDeepPartialEntity<T>,
  ) {
    return this.repository.update(where, data);
  }

  /**
   * Hard delete
   */
  async delete(id: number) {
    return this.repository.delete(id);
  }

  /**
   * Soft delete
   */
  async softDelete(id: number) {
    return this.repository.softDelete(id);
  }

  /**
   * Restore soft deleted
   */
  async restore(id: number) {
    return this.repository.restore(id);
  }

  /**
   * Count
   */
  async count(where?: FindOptionsWhere<T>) {
    return this.repository.count({
      where,
    });
  }

  /**
   * Pagination
   */
  async paginate(
    options: PaginationOptions,

    where?: FindOptionsWhere<T>,

    relations?: FindOptionsRelations<T>,
  ): Promise<PaginatedResult<T>> {
    const {
      page,

      limit,
    } = options;

    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      where,

      relations,

      skip,

      take: limit,

      order: {
        id: 'DESC',
      } as any,
    });

    return {
      data,

      meta: {
        page,

        limit,

        total,

        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Query Builder
   */
  queryBuilder(alias: string): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(alias);
  }

  /**
   * Transaction
   */
  async transaction<R>(
    callback: (manager: EntityManager) => Promise<R>,
  ): Promise<R> {
    return this.repository.manager.transaction(callback);
  }

  /**
   * Raw SQL
   */
  async rawQuery(
    sql: string,

    parameters?: any[],
  ) {
    return this.repository.query(sql, parameters);
  }
}
