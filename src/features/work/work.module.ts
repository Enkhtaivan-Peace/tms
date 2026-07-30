import { Module } from '@nestjs/common';

import { WorkTypeModule } from './work-type/work-type.module';
import { WorkCategoryModule } from './work-category/work-category.module';
import { WorkStatusModule } from './work-status/work-status.module';
import { WorkStatusTransitionModule } from './work-status-transition/work-status-transition.module';

@Module({
  imports: [
    WorkTypeModule,
    WorkCategoryModule,
    WorkStatusModule,
    WorkStatusTransitionModule,
  ],
})
export class WorkModule {}
