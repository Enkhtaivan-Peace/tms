import { Role } from 'src/features/iam/entities/role.entity';
import { DataSource } from 'typeorm';

export async function seedRoles(dataSource: DataSource) {
  const repository = dataSource.getRepository(Role);

  const roles = [
    {
      code: 'SUPER_ADMIN',

      name: 'Super Administrator',

      description: 'Full system access',

      isSystem: true,

      isActive: true,
    },

    {
      code: 'ADMIN',

      name: 'Administrator',

      description: 'System administrator',

      isSystem: true,

      isActive: true,
    },

    {
      code: 'PROJECT_MANAGER',

      name: 'Project Manager',

      description: 'Manage projects and work items',

      isSystem: true,

      isActive: true,
    },

    {
      code: 'TEAM_LEAD',

      name: 'Team Lead',

      description: 'Manage team activities',

      isSystem: true,

      isActive: true,
    },

    {
      code: 'MEMBER',

      name: 'Member',

      description: 'Regular user',

      isSystem: true,

      isActive: true,
    },

    {
      code: 'VIEWER',

      name: 'Viewer',

      description: 'Read only access',

      isSystem: true,

      isActive: true,
    },
  ];

  for (const role of roles) {
    const exists = await repository.findOne({
      where: {
        code: role.code,
      },
    });

    if (!exists) {
      await repository.insert(role);
    }
  }
}
