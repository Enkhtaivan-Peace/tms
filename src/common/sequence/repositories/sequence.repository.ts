import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { SequenceEntity } from '../entities/sequence.entity';

@Injectable()
export class SequenceRepository {
  constructor(
    @InjectRepository(SequenceEntity)
    private readonly repository: Repository<SequenceEntity>,
  ) {}

  async findByCode(code: string) {
    return this.repository.findOne({
      where: {
        code,
      },
    });
  }

  async save(entity: SequenceEntity) {
    return this.repository.save(entity);
  }

  async create(data: Partial<SequenceEntity>) {
    const entity = this.repository.create(data);

    return this.repository.save(entity);
  }
}
