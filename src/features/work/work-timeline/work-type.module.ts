import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkTypeEntity } from './entities/work-type.entity';

import { WorkTypeRepository } from './repositories/work-type.repository';

import { WorkTypeQueryRepository } from './repositories/work-type-query.repository';
import { WorkTypeController } from '../work-type/controller/work-type.controller';
import { WorkTypeService } from '../work-type/services/work-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkTypeEntity])],

  controllers: [WorkTypeController],

  providers: [WorkTypeService, WorkTypeRepository, WorkTypeQueryRepository],

  exports: [WorkTypeService],
})
export class WorkTypeModule {}
