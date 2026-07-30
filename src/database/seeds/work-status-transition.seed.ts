import { WorkStatusTransitionEntity } from 'src/features/work/work-status-transition/entities/work-status-transition.entity';
import { WorkStatusEntity } from 'src/features/work/work-status/entities/work-status.entity';
import { DataSource } from 'typeorm';

export async function seedWorkStatusTransitions(dataSource: DataSource) {
  const statusRepo = dataSource.getRepository(WorkStatusEntity);

  const transitionRepo = dataSource.getRepository(WorkStatusTransitionEntity);

  const statuses = await statusRepo.find();

  const map = new Map(statuses.map((s) => [s.code, s.id]));

  const transitions = [
    {
      name: 'Start Work',
      from: 'TODO',
      to: 'IN_PROGRESS',
    },

    {
      name: 'Submit Review',
      from: 'IN_PROGRESS',
      to: 'IN_REVIEW',
      requiresComment: true,
    },

    {
      name: 'Complete Work',
      from: 'IN_REVIEW',
      to: 'DONE',
      requiresApproval: true,
    },

    {
      name: 'Block Work',
      from: 'IN_PROGRESS',
      to: 'BLOCKED',
    },

    {
      name: 'Resume Work',
      from: 'BLOCKED',
      to: 'IN_PROGRESS',
    },

    {
      name: 'Cancel Work',
      from: 'TODO',
      to: 'CANCELLED',
    },
  ];

  for (const item of transitions) {
    await transitionRepo.insert({
      name: item.name,

      fromStatusId: map.get(item.from),

      toStatusId: map.get(item.to),

      requiresComment: item.requiresComment ?? false,

      requiresApproval: item.requiresApproval ?? false,
    } as any);
  }
}
