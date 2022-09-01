import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import {} from 'crypto';
import { AES, enc } from 'crypto-js';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    const UnCrypt = AES.decrypt(password, 'hard2gue$s');
    const cleanPass = UnCrypt.toString(enc.Utf8);
    console.log(`local auth guard got password: ${UnCrypt}`);
    const user = await this.authService.validateUser(
      email,
      cleanPass,
      req.body.role,
    );

    if (!user) {
      throw new UnauthorizedException('Please check your password or email');
    }

    return user;
  }
}
