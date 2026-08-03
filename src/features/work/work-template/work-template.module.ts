import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkTemplateEntity } from './entities/work-template.entity';
import { WorkTemplateController } from './controller/work-template.controller';
import { WorkTemplateService } from './services/work-template.service';
import { WorkTemplateRepository } from './repositories/work-template.repository';
import { WorkTemplateQueryRepository } from './repositories/work-template-query.repository';
import { WorkTemplateStatusModule } from '../work-template-status/work-template-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkTemplateEntity]),
    WorkTemplateStatusModule,
  ],

  controllers: [WorkTemplateController],

  providers: [
    WorkTemplateService,
    WorkTemplateRepository,
    WorkTemplateQueryRepository,
  ],

  exports: [WorkTemplateRepository],
})
export class WorkTemplateModule {}
