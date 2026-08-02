import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkItemEntity } from './entities/work-item.entity';

import { WorkItemService } from './services/work-item.service';

import { WorkItemRepository } from './repositories/work-item.repository';

import { WorkItemQueryRepository } from './repositories/work-item-query.repository';

import { WorkTemplateModule } from '../work-template/work-template.module';
import { SequenceModule } from 'src/common/sequence/sequence.module';
import { WorkItemController } from './controller/work-item.controller';
import { WorkActivityModule } from '../work-activity/work-activity.module';
import { WorkStatusTransitionModule } from '../work-status-transition/work-status-transition.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkItemEntity]),
    WorkTemplateModule,
    SequenceModule,
    WorkActivityModule,
    WorkStatusTransitionModule,
  ],

  controllers: [WorkItemController],

  providers: [WorkItemService, WorkItemRepository, WorkItemQueryRepository],

  exports: [WorkItemService],
})
export class WorkItemModule {}
