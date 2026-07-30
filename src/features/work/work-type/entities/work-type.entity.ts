import { BaseEntity } from 'src/common/base/base.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'work_types',
})
@Index(['code'], { unique: true })
export class WorkTypeEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 30,
  })
  code!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

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
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  description?: string;

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
    type: 'integer',
    default: 0,
  })
  sortOrder!: number;

  // Audit columns

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;

  @Column({
    name: 'created_by',
    type: 'bigint',
    nullable: true,
  })
  createdBy?: number;

  @Column({
    name: 'updated_by',
    type: 'bigint',
    nullable: true,
  })
  updatedBy?: number;

  @Column({
    name: 'deleted_by',
    type: 'bigint',
    nullable: true,
  })
  deletedBy?: number;
}
