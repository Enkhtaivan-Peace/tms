import { Entity, Column } from 'typeorm';

import { BaseEntity } from 'src/common/base/base.entity';

@Entity({
  name: 'work_categories',
  schema: 'work',
})
export class WorkCategoryEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  code!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  color?: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  icon?: string;

  @Column({
    name: 'is_default',
    type: 'boolean',
    default: false,
  })
  isDefault!: boolean;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @Column({
    name: 'sort_order',
    type: 'int',
    default: 0,
  })
  sortOrder!: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt!: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt!: Date;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;
}
