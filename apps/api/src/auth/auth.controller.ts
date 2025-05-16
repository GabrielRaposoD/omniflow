import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { Public } from './public';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@repo/api';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  /* Login user */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const token = await this.authService.login(req.user);

    return token;
  }

  /* Register user */
  @Public()
  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    const user = await this.userService.create(userData);

    const token = await this.authService.login(user);

    return token;
  }

  /* Get user profile */

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const { passwordHash: _passwordHash, ...user } =
      await this.userService.findOne(req.user.email);
    return user;
  }
}
