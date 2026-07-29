import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from '../repositories/user.repository';
import { JwtPayload } from 'src/common/helpers/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userRepository: UserRepository) {
    console.log('JWT SECRET', process.env.JWT_SECRET || 'jwt-secret baihgui');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: JwtPayload) {
    console.log('JWT PAYLOAD', payload);
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
