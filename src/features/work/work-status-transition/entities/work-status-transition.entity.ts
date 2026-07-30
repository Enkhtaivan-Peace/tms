import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BaseEntity } from 'src/common/base/base.entity';

import { WorkStatusEntity } from '../../work-status/entities/work-status.entity';

@Entity({
  name: 'work_status_transitions',
})
export class WorkStatusTransitionEntity extends BaseEntity {
  @Column({
    name: 'from_status_id',
    type: 'bigint',
  })
  fromStatusId!: number;

  @Column({
    name: 'to_status_id',
    type: 'bigint',
  })
  toStatusId!: number;

  @ManyToOne(() => WorkStatusEntity)
  @JoinColumn({
    name: 'from_status_id',
  })
  fromStatus!: WorkStatusEntity;

  @ManyToOne(() => WorkStatusEntity)
  @JoinColumn({
    name: 'to_status_id',
  })
  toStatus!: WorkStatusEntity;

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
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
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
