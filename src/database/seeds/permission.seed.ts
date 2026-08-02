import { Permission } from 'src/features/iam/entities/permission.entity';
import { DataSource } from 'typeorm';

export async function seedPermissions(dataSource: DataSource) {
  const repository = dataSource.getRepository(Permission);

  const permissions = [
    /**
     * User
     */

    {
      code: 'user.view',
      name: 'View Users',
      module: 'USER',
    },

    {
      code: 'user.create',
      name: 'Create User',
      module: 'USER',
    },

    {
      code: 'user.update',
      name: 'Update User',
      module: 'USER',
    },

    {
      code: 'user.delete',
      name: 'Delete User',
      module: 'USER',
    },

    /**
     * Role
     */

    {
      code: 'role.view',
      name: 'View Roles',
      module: 'ROLE',
    },

    {
      code: 'role.manage',
      name: 'Manage Roles',
      module: 'ROLE',
    },

    /**
     * Project
     */

    {
      code: 'project.view',
      name: 'View Projects',
      module: 'PROJECT',
    },

    {
      code: 'project.create',
      name: 'Create Project',
      module: 'PROJECT',
    },

    {
      code: 'project.update',
      name: 'Update Project',
      module: 'PROJECT',
    },

    {
      code: 'project.delete',
      name: 'Delete Project',
      module: 'PROJECT',
    },

    /**
     * Work
     */

    {
      code: 'work.view',
      name: 'View Work Items',
      module: 'WORK',
    },

    {
      code: 'work.create',
      name: 'Create Work Item',
      module: 'WORK',
    },

    {
      code: 'work.update',
      name: 'Update Work Item',
      module: 'WORK',
    },

    {
      code: 'work.delete',
      name: 'Delete Work Item',
      module: 'WORK',
    },

    {
      code: 'work.assign',
      name: 'Assign Work Item',
      module: 'WORK',
    },

    /**
     * Comment
     */

    {
      code: 'comment.create',
      name: 'Create Comment',
      module: 'COMMENT',
    },

    {
      code: 'comment.delete',
      name: 'Delete Comment',
      module: 'COMMENT',
    },

    /**
     * Report
     */

    {
      code: 'report.view',
      name: 'View Reports',
      module: 'REPORT',
    },

    {
      code: 'report.export',
      name: 'Export Reports',
      module: 'REPORT',
    },
    // work review
    {
      code: 'WORK_REVIEW_SUBMIT',
      name: 'Submit work review',
      module: 'WORK',
    },

    {
      code: 'WORK_REVIEW_APPROVE',
      name: 'Approve work review',
      module: 'WORK',
    },

    {
      code: 'WORK_REVIEW_REJECT',
      name: 'Reject work review',
      module: 'WORK',
    },
  ];

  for (const permission of permissions) {
    const exists = await repository.findOne({
      where: {
        code: permission.code,
      },
    });

    if (!exists) {
      await repository.insert(permission);
    }
  }
}
