import { DataSource } from 'typeorm';

import { WorkTemplateEntity } from 'src/features/work/work-template/entities/work-template.entity';

export async function seedWorkTemplates(dataSource: DataSource) {
  const repository = dataSource.getRepository(WorkTemplateEntity);

  const exists = await repository.count();

  if (exists > 0) {
    console.log('Work templates already seeded');

    return;
  }

  await repository.insert([
    /**
     * General Task
     */
    {
      code: 'TASK',

      name: 'General Task',

      description: 'General task management template',

      /**
       * Work Type
       * TASK type
       */
      workTypeId: 1,

      /**
       * Optional category
       */
      workCategoryId: 1,

      /**
       * Sequence generator
       */

      sequenceKey: 'WORK_TASK',

      /**
       * Initial status
       * TODO
       */
      initialStatusId: 1,

      defaultPriority: 'MEDIUM',

      defaultEstimatedHours: 8,

      defaultDueDays: 7,

      allowAttachment: true,

      allowComment: true,

      requireApproval: false,

      isDefault: true,

      isActive: true,
    },

    /**
     * Bug Fix
     */
    {
      code: 'BUG',

      name: 'Bug Fix',

      description: 'Software bug fixing workflow',

      workTypeId: 2,

      workCategoryId: 2,
      sequenceKey: 'WORK_BUG',

      initialStatusId: 1,

      defaultPriority: 'HIGH',

      defaultEstimatedHours: 4,

      defaultDueDays: 3,

      allowAttachment: true,

      allowComment: true,

      requireApproval: false,

      isDefault: false,

      isActive: true,
    },

    /**
     * Feature Development
     */
    {
      code: 'FEATURE',

      name: 'Feature Development',

      description: 'New feature implementation',

      workTypeId: 3,

      workCategoryId: 3,

      sequenceKey: 'WORK_FEATURE',

      initialStatusId: 1,

      defaultPriority: 'MEDIUM',

      defaultEstimatedHours: 16,

      defaultDueDays: 14,

      allowAttachment: true,

      allowComment: true,

      requireApproval: true,

      isDefault: false,

      isActive: true,
    },
  ]);

  console.log('Work templates seeded successfully');
}
