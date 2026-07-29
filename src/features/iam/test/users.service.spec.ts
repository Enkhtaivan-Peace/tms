import { Test } from '@nestjs/testing';

import { UsersService } from '../services/users.service';

import { UserRepository } from '../repositories/user.repository';

import { UserRoleRepository } from '../repositories/user-role.repository';

describe('UsersService', () => {
  let service: UsersService;

  const userRepositoryMock = {
    findAll: jest.fn(),

    findById: jest.fn(),

    update: jest.fn(),

    softDelete: jest.fn(),
  };

  const userRoleRepositoryMock = {
    assignRole: jest.fn(),

    removeRole: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,

        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },

        {
          provide: UserRoleRepository,
          useValue: userRoleRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(UsersService);

    jest.clearAllMocks();
  });

  it('should return users', async () => {
    userRepositoryMock.findAll.mockResolvedValue([]);

    const result = await service.findAll();

    expect(result).toEqual([]);
  });

  it('should assign role to user', async () => {
    userRepositoryMock.findById.mockResolvedValue({
      id: 1,
    });

    userRoleRepositoryMock.assignRole.mockResolvedValue({
      userId: 1,

      roleId: 2,
    });

    const result = await service.assignRole(1, 2);

    expect(result.roleId).toBe(2);
  });
});
