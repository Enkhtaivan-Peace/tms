import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { SequenceEntity } from '../entities/sequence.entity';

@Injectable()
export class SequenceService {
  constructor(private readonly dataSource: DataSource) {}

  async next(
    code: string,

    options?: {
      prefixLength?: number;
    },
  ): Promise<string> {
    return this.dataSource.transaction(async (manager) => {
      let sequence = await manager.findOne(SequenceEntity, {
        where: {
          code,
        },

        lock: {
          mode: 'pessimistic_write',
        },
      });

      /**
       * Auto create sequence
       */
      if (!sequence) {
        sequence = manager.create(SequenceEntity, {
          code,

          currentNumber: 0,

          prefixLength: options?.prefixLength ?? 6,
        });

        await manager.save(sequence);
      }

      sequence.currentNumber++;

      await manager.save(sequence);

      return this.format(sequence);
    });
  }

  private format(sequence: SequenceEntity) {
    return `${sequence.code}-${String(sequence.currentNumber).padStart(
      sequence.prefixLength,
      '0',
    )}`;
  }
}
