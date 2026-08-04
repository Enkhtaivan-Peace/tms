import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { LoginDto } from '../dto/login.dto';

import { RegisterDto } from '../dto/register.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    console.log('login ...', process.env.JWT_SECRET);
    return this.authService.login(dto.username, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@CurrentUser() currentUser: { id: number; username: string }) {
    console.log('token', currentUser);
    return this.authService.logout(currentUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken!);
  }
}
