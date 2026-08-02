import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkActivityEntity } from './entities/work-activity.entity';

import { WorkActivityRepository } from './repositories/work-activity.repository';

import { WorkActivityQueryRepository } from './repositories/work-activity-query.repository';

import { WorkActivityService } from './services/work-activity.service';

import { WorkActivityController } from './controller/work-activity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkActivityEntity])],

  controllers: [WorkActivityController],

  providers: [
    WorkActivityRepository,
    WorkActivityQueryRepository,
    WorkActivityService,
  ],

  exports: [WorkActivityService],
})
export class WorkActivityModule {}
