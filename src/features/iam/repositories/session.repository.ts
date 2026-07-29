import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserSession } from '../entities/user-session.entity';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(UserSession)
    private readonly repository: Repository<UserSession>,
  ) {}

  createSession(data: Partial<UserSession>) {
    const session = this.repository.create(data);

    return this.repository.save(session);
  }

  findByRefreshToken(refreshToken: string) {
    return this.repository.findOne({
      where: {
        refreshToken,
        revoked: false,
      },
    });
  }

  findValidSession(refreshToken: string) {
    return this.repository.findOne({
      where: {
        refreshToken,
        revoked: false,
      },
    });
  }

  async revoke(id: number) {
    return this.repository.update(id, {
      revoked: true,
    });
  }
  async revokeAll(userId: number) {
    return this.repository.update(
      {
        userId,
        revoked: false,
      },

      {
        revoked: true,
      },
    );
  }
}
