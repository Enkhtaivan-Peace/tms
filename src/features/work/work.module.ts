import { Module } from '@nestjs/common';

import { WorkTypeModule } from './work-type/work-type.module';
import { WorkCategoryModule } from './work-category/work-category.module';
import { WorkStatusModule } from './work-status/work-status.module';
import { WorkStatusTransitionModule } from './work-status-transition/work-status-transition.module';
import { WorkTemplateModule } from './work-template/work-template.module';
import { WorkTemplateStatusModule } from './work-template-status/work-template-status.module';

@Module({
  imports: [
    WorkTypeModule,
    WorkCategoryModule,
    WorkStatusModule,
    WorkStatusTransitionModule,
    WorkTemplateModule,
    WorkTemplateStatusModule,
  ],
})
export class WorkModule {}
