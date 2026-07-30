import { WorkStatusEntity } from 'src/features/work/work-status/entities/work-status.entity';
import { DataSource } from 'typeorm';

export async function seedWorkStatuses(dataSource: DataSource) {
  const repository = dataSource.getRepository(WorkStatusEntity);

  const statuses = [
    {
      code: 'BACKLOG',

      name: 'Backlog',

      description: 'Work is planned but not started',

      category: 'BACKLOG',

      color: '#8c8c8c',

      isInitial: true,

      sortOrder: 1,
    },

    {
      code: 'TODO',

      name: 'Todo',

      description: 'Ready to start',

      category: 'OPEN',

      color: '#1677ff',

      sortOrder: 2,
    },

    {
      code: 'IN_PROGRESS',

      name: 'In Progress',

      description: 'Work is being executed',

      category: 'ACTIVE',

      color: '#faad14',

      sortOrder: 3,
    },

    {
      code: 'IN_REVIEW',

      name: 'In Review',

      description: 'Waiting for review',

      category: 'REVIEW',

      color: '#722ed1',

      sortOrder: 4,
    },

    {
      code: 'BLOCKED',

      name: 'Blocked',

      description: 'Work is blocked',

      category: 'ACTIVE',

      color: '#ff4d4f',

      sortOrder: 5,
    },

    {
      code: 'DONE',

      name: 'Done',

      description: 'Completed',

      category: 'CLOSED',

      color: '#52c41a',

      isFinal: true,

      sortOrder: 6,
    },

    {
      code: 'CANCELLED',

      name: 'Cancelled',

      description: 'Work cancelled',

      category: 'CLOSED',

      color: '#595959',

      isFinal: true,

      sortOrder: 7,
    },
  ];

  for (const status of statuses) {
    const exists = await repository.findOne({
      where: {
        code: status.code,
      },
    });

    if (!exists) {
      await repository.insert(status);
    }
  }
}
