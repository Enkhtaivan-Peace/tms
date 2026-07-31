import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { SequenceEntity } from './entities/sequence.entity';

import { SequenceRepository } from './repositories/sequence.repository';

import { SequenceService } from './services/sequence.service';

@Module({
  imports: [TypeOrmModule.forFeature([SequenceEntity])],

  providers: [SequenceRepository, SequenceService],

  exports: [SequenceService],
})
export class SequenceModule {}
