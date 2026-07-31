import { DataSource } from 'typeorm';

import { SequenceEntity } from 'src/common/sequence/entities/sequence.entity';

export async function seedSequences(dataSource: DataSource) {
  const repo = dataSource.getRepository(SequenceEntity);

  const data = [
    {
      code: 'TASK',
      currentNumber: 0,
      prefixLength: 6,
    },

    {
      code: 'BUG',
      currentNumber: 0,
      prefixLength: 6,
    },

    {
      code: 'REQUEST',
      currentNumber: 0,
      prefixLength: 6,
    },
  ];

  for (const item of data) {
    const exists = await repo.findOne({
      where: {
        code: item.code,
      },
    });

    if (!exists) {
      await repo.save(repo.create(item));
    }
  }
}
