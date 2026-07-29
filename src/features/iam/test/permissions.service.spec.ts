import { Test } from '@nestjs/testing';

import { PermissionsService } from '../services/permissions.service';

import { PermissionRepository } from '../repositories/permission.repository';

describe('PermissionsService', () => {
  let service: PermissionsService;

  const repositoryMock = {
    findAll: jest.fn(),

    findById: jest.fn(),

    codeExists: jest.fn(),

    create: jest.fn(),

    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PermissionsService,

        {
          provide: PermissionRepository,

          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get(PermissionsService);

    jest.clearAllMocks();
  });

  it('should create permission', async () => {
    repositoryMock.codeExists.mockResolvedValue(false);

    repositoryMock.create.mockResolvedValue({
      id: 1,

      code: 'USER_CREATE',
    });

    const result = await service.create({
      code: 'USER_CREATE',

      module: 'USER',

      action: 'CREATE',
    });

    expect(result.id).toBe(1);
  });
});
