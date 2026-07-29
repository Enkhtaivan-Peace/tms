import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';
import { beforeEach, describe } from 'node:test';

describe('AuthService', () => {
  let service: AuthService;

  const userRepositoryMock = {
    usernameExists: jest.fn(),

    emailExists: jest.fn(),

    create: jest.fn(),

    findByUsername: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,

        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register new user', async () => {
      userRepositoryMock.usernameExists.mockResolvedValue(false);

      userRepositoryMock.emailExists.mockResolvedValue(false);

      userRepositoryMock.create.mockResolvedValue({
        id: 1,

        username: 'admin',

        email: 'admin@test.com',
      });

      const result = await service.register({
        username: 'admin',

        email: 'admin@test.com',

        password: 'password123',
      });

      expect(result.id).toBe(1);

      expect(userRepositoryMock.create).toHaveBeenCalled();
    });

    it('should throw duplicate username', async () => {
      userRepositoryMock.usernameExists.mockResolvedValue(true);

      await expect(
        service.register({
          username: 'admin',

          email: 'admin@test.com',

          password: 'password123',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('validateUser', () => {
    it('should validate correct password', async () => {
      const password = await bcrypt.hash('password123', 10);

      userRepositoryMock.findByUsername.mockResolvedValue({
        id: 1,

        passwordHash: password,
      });

      const result = await service.validateUser('admin', 'password123');

      expect(result.id).toBe(1);
    });

    it('should reject invalid password', async () => {
      userRepositoryMock.findByUsername.mockResolvedValue({
        id: 1,

        passwordHash: 'wrong',
      });

      await expect(service.validateUser('admin', '123456')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
