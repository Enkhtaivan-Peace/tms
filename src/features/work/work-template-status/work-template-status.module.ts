import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkTemplateStatusEntity } from './entities/work-template-status.entity';

import { WorkTemplateStatusController } from './controller/work-template-status.controller';

import { WorkTemplateStatusService } from './services/work-template-status.service';

import { WorkTemplateStatusRepository } from './repositories/work-template-status.repository';

import { WorkTemplateStatusQueryRepository } from './repositories/work-template-status-query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkTemplateStatusEntity])],

  controllers: [WorkTemplateStatusController],

  providers: [
    WorkTemplateStatusService,
    WorkTemplateStatusRepository,
    WorkTemplateStatusQueryRepository,
  ],

  exports: [WorkTemplateStatusService, WorkTemplateStatusRepository],
})
export class WorkTemplateStatusModule {}
