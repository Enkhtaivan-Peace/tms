import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { SequenceEntity } from '../entities/sequence.entity';

@Injectable()
export class SequenceService {
  constructor(private readonly dataSource: DataSource) {}

  async next(code: string): Promise<string> {
    return this.dataSource.transaction(async (manager) => {
      const sequence = await manager.findOne(SequenceEntity, {
        where: {
          code,
        },

        lock: {
          mode: 'pessimistic_write',
        },
      });

      if (!sequence) {
        throw new Error(`Sequence ${code} not found`);
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
