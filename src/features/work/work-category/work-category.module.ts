import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkCategoryEntity } from './entities/work-category.entity';

import { WorkCategoryController } from './controller/work-category.controller';

import { WorkCategoryService } from './services/work-category.service';

import { WorkCategoryRepository } from './repositories/work-category.repository';

import { WorkCategoryQueryRepository } from './repositories/work-category-query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkCategoryEntity])],

  controllers: [WorkCategoryController],

  providers: [
    WorkCategoryService,
    WorkCategoryRepository,
    WorkCategoryQueryRepository,
  ],

  exports: [WorkCategoryRepository],
})
export class WorkCategoryModule {}
