/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { Repository } from 'typeorm';
import { Role } from '../role/role.enum';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { TokenBlacklistEntity } from './blacklist/blacklist.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(TokenBlacklistEntity)
    private blacklistRepo: Repository<TokenBlacklistEntity>,
  ) {}

  async validateUser(email: string, pass: string, role: Role): Promise<any> {
    if (!isEmail(email)) {
      throw new BadRequestException('Email invalid!');
    }

    const user = await this.usersService.findOne({ email });

    if (user && this.validatePass(pass, user) && user.role === role) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
  async login({
    email,
    role,
    password,
  }): Promise<{ token: string; role: Role; userId: number }> {
    const { id } = await this.usersService.findOne({ email });
    console.log(id);
    const payload = { email: email, role: role, id };
    const expiresIn = this.configService.get<boolean>('IS_PROD')
      ? '3600s'
      : '24h';
    const token = this.jwtService.sign(payload, { expiresIn });

    return { token, role: role, userId: id };
  }

  public async validatePass(password: string, user: User): Promise<boolean> {
    const IsValidPassword = await bcrypt.compare(password, user.password);

    return IsValidPassword;
  }

  public async invalidToken(token: string): Promise<boolean> {
    const value = token.split('Bearer ')[1];

    await this.blacklistRepo.save({ token: value });

    return true;
  }
}
