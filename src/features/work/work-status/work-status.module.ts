import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkStatusEntity } from './entities/work-status.entity';

import { WorkStatusController } from './controller/work-status.controller';

import { WorkStatusService } from './services/work-status.service';

import { WorkStatusRepository } from './repositories/work-status.repository';

import { WorkStatusQueryRepository } from './repositories/work-status-query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkStatusEntity])],

  controllers: [WorkStatusController],

  providers: [
    WorkStatusService,

    WorkStatusRepository,

    WorkStatusQueryRepository,
  ],

  exports: [WorkStatusRepository],
})
export class WorkStatusModule {}
