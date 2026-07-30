import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkTypeEntity } from './entities/work-type.entity';

import { WorkTypeController } from './controller/work-type.controller';

import { WorkTypeService } from './services/work-type.service';

import { WorkTypeRepository } from './repositories/work-type.repository';

import { WorkTypeQueryRepository } from './repositories/work-type-query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkTypeEntity])],

  controllers: [WorkTypeController],

  providers: [WorkTypeService, WorkTypeRepository, WorkTypeQueryRepository],

  exports: [WorkTypeService],
})
export class WorkTypeModule {}
