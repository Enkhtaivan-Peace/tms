import { Module } from '@nestjs/common';

import { WorkTypeModule } from './work-type/work-type.module';
import { WorkCategoryModule } from './work-category/work-category.module';
import { WorkStatusModule } from './work-status/work-status.module';

@Module({
  imports: [WorkTypeModule, WorkCategoryModule, WorkStatusModule],
})
export class WorkModule {}
