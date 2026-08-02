import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkStatusTransitionEntity } from './entities/work-status-transition.entity';
import { WorkStatusTransitionRepository } from './repositories/work-status-transition.repository';

import { WorkStatusTransitionQueryRepository } from './repositories/work-status-transition-query.repository';
import { WorkStatusTransitionController } from './controller/work-status-transition.controller';
import { WorkStatusTransitionService } from './services/work-status-transition.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkStatusTransitionEntity])],

  controllers: [WorkStatusTransitionController],

  providers: [
    WorkStatusTransitionService,
    WorkStatusTransitionRepository,
    WorkStatusTransitionQueryRepository,
  ],

  exports: [WorkStatusTransitionService, WorkStatusTransitionRepository],
})
export class WorkStatusTransitionModule {}
