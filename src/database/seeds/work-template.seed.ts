import { WorkTemplateEntity } from 'src/features/work/work-template/entities/work-template.entity';

import { DataSource } from 'typeorm';

export async function seedWorkTypes(dataSource: DataSource) {
  const repository = dataSource.getRepository(WorkTemplateEntity);

  const exists = await repository.count();

  if (exists > 0) {
    return;
  }

  await repository.insert([
    {
      code: 'TASK',
      name: 'General Task',
      defaultPriority: 'MEDIUM',
      estimatedHours: 8,
      isDefault: true,
    },
    {
      code: 'BUG',
      name: 'Bug Fix',
      defaultPriority: 'HIGH',
      estimatedHours: 4,
    },
    {
      code: 'FEATURE',
      name: 'Feature Development',
      defaultPriority: 'MEDIUM',
      estimatedHours: 40,
    },
    {
      code: 'CHANGE',
      name: 'Change Request',
      defaultPriority: 'MEDIUM',
      estimatedHours: 24,
    },
    {
      code: 'INCIDENT',
      name: 'Incident',
      defaultPriority: 'MEDIUM',
      estimatedHours: 24,
    },
    {
      code: 'IMPROVEMENT',
      name: 'Improvement',
      defaultPriority: 'MEDIUM',
      estimatedHours: 8,
    },
  ]);
}
