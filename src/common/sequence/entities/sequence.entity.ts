import { Entity, Column } from 'typeorm';

import { BaseEntity } from 'src/common/base/base.entity';

@Entity({
  name: 'sequences',
})
export class SequenceEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  code!: string;

  @Column({
    name: 'current_number',
    type: 'bigint',
    default: 0,
  })
  currentNumber!: number;

  @Column({
    name: 'prefix_length',
    type: 'int',
    default: 6,
  })
  prefixLength!: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}
