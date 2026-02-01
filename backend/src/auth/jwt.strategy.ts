import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'tms-super-secret-jwt-key-2026',
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return {
      sub: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
