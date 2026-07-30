import { DataSource } from 'typeorm';

import { WorkCategoryEntity } from 'src/features/work/work-category/entities/work-category.entity';

export async function seedWorkCategories(dataSource: DataSource) {
  const repository = dataSource.getRepository(WorkCategoryEntity);

  const categories = [
    {
      code: 'BACKEND',
      name: 'Backend Development',
      color: '#1677ff',
      sortOrder: 1,
    },

    {
      code: 'FRONTEND',
      name: 'Frontend Development',
      color: '#52c41a',
      sortOrder: 2,
    },

    {
      code: 'DATABASE',
      name: 'Database',
      color: '#722ed1',
      sortOrder: 3,
    },

    {
      code: 'DEVOPS',
      name: 'DevOps',
      color: '#fa541c',
      sortOrder: 4,
    },

    {
      code: 'QA',
      name: 'Quality Assurance',
      color: '#13c2c2',
      sortOrder: 5,
    },

    {
      code: 'SECURITY',
      name: 'Security',
      color: '#eb2f96',
      sortOrder: 6,
    },

    {
      code: 'DOCUMENTATION',
      name: 'Documentation',
      color: '#faad14',
      sortOrder: 7,
    },

    {
      code: 'MANAGEMENT',
      name: 'Management',
      color: '#8c8c8c',
      sortOrder: 8,
    },
  ];

  for (const category of categories) {
    const exists = await repository.findOne({
      where: {
        code: category.code,
      },
    });

    if (!exists) {
      await repository.insert(category);
    }
  }
}
