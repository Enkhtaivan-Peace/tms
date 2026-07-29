import { Injectable } from '@nestjs/common';

import { DepartmentRepository } from '../repositories/department.repository';

import { DepartmentTree } from '../interfaces/department-tree.interface';

@Injectable()
export class DepartmentTreeService {
  constructor(private readonly repository: DepartmentRepository) {}

  async getTree(id: number) {
    const departments = await this.repository.find({
      where: { id },
    });

    const activeDepartments = departments.filter((dept) => (dept as any).deletedAt === null);

    return this.buildTree(activeDepartments);
  }

  private buildTree(departments: any[], parentId = null): DepartmentTree[] {
    return departments
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        id: item.id,

        name: item.name,

        code: item.code,

        children: this.buildTree(departments, item.id),
      }));
  }
}
