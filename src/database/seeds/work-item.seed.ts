import { WorkItemEntity } from 'src/features/work/work-item/entities/work-item.entity';
import { DataSource } from 'typeorm';

export async function seedWorkItems(dataSource: DataSource) {
  const repository = dataSource.getRepository(WorkItemEntity);

  const count = await repository.count();

  if (count > 0) {
    return;
  }

  await repository.save([
    {
      code: 'TASK-000001',

      title: 'Implement Authentication API',

      description: 'Create login and JWT authentication flow',

      workTemplateId: 1,

      statusId: 1,

      priority: 'HIGH',

      estimatedHours: 16,

      spentHours: 0,

      createdBy: 1,
    },

    {
      code: 'TASK-000002',

      title: 'Create Organization Module',

      description: 'Implement organization structure',

      workTemplateId: 1,

      statusId: 1,

      priority: 'MEDIUM',

      estimatedHours: 40,

      spentHours: 0,

      createdBy: 1,
    },
  ]);
}
