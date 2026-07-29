import { Test } from '@nestjs/testing';

import { RolesService } from '../services/roles.service';

import { RoleRepository } from '../repositories/role.repository';

import { RolePermissionRepository } from '../repositories/role-permission.repository';

describe('RolesService', () => {
  let service: RolesService;

  const roleRepositoryMock = {
    findAll: jest.fn(),

    findWithPermissions: jest.fn(),

    codeExists: jest.fn(),

    create: jest.fn(),

    softDelete: jest.fn(),
  };

  const rolePermissionRepositoryMock = {
    assignPermission: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RolesService,

        {
          provide: RoleRepository,
          useValue: roleRepositoryMock,
        },

        {
          provide: RolePermissionRepository,
          useValue: rolePermissionRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(RolesService);

    jest.clearAllMocks();
  });

  it('should create role', async () => {
    roleRepositoryMock.codeExists.mockResolvedValue(false);

    roleRepositoryMock.create.mockResolvedValue({
      id: 1,

      code: 'ADMIN',
    });

    const result = await service.create({
      code: 'ADMIN',

      name: 'Administrator',
    });

    expect(result.code).toBe('ADMIN');
  });
});
