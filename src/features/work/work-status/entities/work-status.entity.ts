import { Entity, Column, UpdateDateColumn } from 'typeorm';

import { BaseEntity } from 'src/common/base/base.entity';

@Entity({
  name: 'work_statuses',
})
export class WorkStatusEntity extends BaseEntity {
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

  /**
   * Status group
   *
   * BACKLOG
   * OPEN
   * ACTIVE
   * REVIEW
   * CLOSED
   */
  @Column({
    type: 'varchar',
    length: 30,
    default: 'OPEN',
  })
  category!: string;

  @Column({
    name: 'is_initial',
    type: 'boolean',
    default: false,
  })
  isInitial!: boolean;

  @Column({
    name: 'is_final',
    type: 'boolean',
    default: false,
  })
  isFinal!: boolean;

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

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;
}
