import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/user.repository';
import { UserStatus } from 'src/common/helpers/enums/user-status.enum';
import { SessionRepository } from '../repositories/session.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/helpers/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    const existsUsername = await this.userRepository.usernameExists(
      data.username,
    );

    if (existsUsername) {
      throw new ConflictException('Username already exists');
    }

    const existsEmail = await this.userRepository.emailExists(data.email);

    if (existsEmail) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    return this.userRepository.create({
      username: data.username,

      email: data.email,

      passwordHash,

      firstName: data.firstName,

      lastName: data.lastName,

      status: UserStatus.ACTIVE,

      isActive: true,
    });
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        username: user.username,
      },
      {
        expiresIn: '5d',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        expiresIn: '30d',
      },
    );

    await this.sessionRepository.createSession({
      userId: user.id,
      refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      revoked: false,
    });

    return {
      accessToken,

      refreshToken,

      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async logout(userId: number) {
    await this.sessionRepository.revokeAll(userId);

    return {
      success: true,
      message: 'Logout successful',
    };
  }

  async refresh(refreshToken: string) {
    const session = await this.sessionRepository.findValidSession(refreshToken);

    if (!session) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (session.expiresAt < new Date()) {
      await this.sessionRepository.revoke(session.id);
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.userRepository.findOne(session);

    if (!user) {
      throw new UnauthorizedException();
    }

    /**
     * Refresh Token Rotation
     */

    await this.sessionRepository.revoke(session.id);

    const newAccessToken = this.jwtService.sign(
      {
        sub: user.id,
        username: user.username,
      },
      {
        expiresIn: '5d',
      },
    );

    const newRefreshToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        expiresIn: '30d',
      },
    );

    await this.sessionRepository.createSession({
      userId: user.id,

      refreshToken: newRefreshToken,

      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),

      revoked: false,
    });

    return {
      accessToken: newAccessToken,

      refreshToken: newRefreshToken,
    };
  }
}
