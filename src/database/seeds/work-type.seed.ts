import { WorkTypeEntity } from 'src/features/work/work-type/entities/work-type.entity';
import { DataSource } from 'typeorm';

export async function seedWorkTypes(dataSource: DataSource) {
  const repository = dataSource.getRepository(WorkTypeEntity);

  const exists = await repository.count();

  if (exists > 0) {
    return;
  }

  await repository.insert([
    {
      code: 'TASK',
      name: 'Task',
      description: 'General work item',
      color: '#1677ff',
      icon: 'task',
      isDefault: true,
      isActive: true,
      sortOrder: 1,
    },

    {
      code: 'BUG',
      name: 'Bug',
      description: 'Defect or issue fixing',
      color: '#ff4d4f',
      icon: 'bug',
      isDefault: false,
      isActive: true,
      sortOrder: 2,
    },

    {
      code: 'FEATURE',
      name: 'Feature',
      description: 'New feature development',
      color: '#52c41a',
      icon: 'feature',
      isDefault: false,
      isActive: true,
      sortOrder: 3,
    },

    {
      code: 'IMPROVEMENT',
      name: 'Improvement',
      description: 'Enhancement of existing functionality',
      color: '#722ed1',
      icon: 'improvement',
      isDefault: false,
      isActive: true,
      sortOrder: 4,
    },

    {
      code: 'REQUEST',
      name: 'Request',
      description: 'Business or user request',
      color: '#faad14',
      icon: 'request',
      isDefault: false,
      isActive: true,
      sortOrder: 5,
    },

    {
      code: 'INCIDENT',
      name: 'Incident',
      description: 'Production incident handling',
      color: '#fa541c',
      icon: 'incident',
      isDefault: false,
      isActive: true,
      sortOrder: 6,
    },

    {
      code: 'CHANGE',
      name: 'Change',
      description: 'Change management request',
      color: '#13c2c2',
      icon: 'change',
      isDefault: false,
      isActive: true,
      sortOrder: 7,
    },
  ]);
}
