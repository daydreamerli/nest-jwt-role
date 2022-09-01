import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(Date());
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() { email, role, password }) {
    return this.authService.login({ email, role, password });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request) {
    const token = req.headers.authorization;

    return this.authService.invalidToken(token);
  }

  @Get('userRole')
  @UseGuards(JwtAuthGuard)
  currentRole(@Req() req) {
    return req.user.role;
  }
}
