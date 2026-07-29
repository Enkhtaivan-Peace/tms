import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartmentEntity } from './entities/department.entity';

import { DepartmentController } from './controllers/department.controller';

import { DepartmentService } from './services/department.service';

import { DepartmentTreeService } from './services/department-tree.service';

import { DepartmentRepository } from './repositories/department.repository';

import { DepartmentQueryRepository } from './repositories/department-query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],

  controllers: [DepartmentController],

  providers: [
    DepartmentService,

    DepartmentTreeService,

    DepartmentRepository,

    DepartmentQueryRepository,
  ],

  exports: [DepartmentService],
})
export class DepartmentModule {}
