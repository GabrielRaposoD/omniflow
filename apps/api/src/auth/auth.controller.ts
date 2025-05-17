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
import { CreateUserDto, LoginDto } from '@repo/api';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginReturn } from '@repo/api';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  /**
   * Login a user
   *
   * @remarks This operation allows you to login a user.
   *
   * @throws {200} Login successful.
   */
  @ApiResponse({ type: LoginReturn })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() _userData: LoginDto) {
    const token = await this.authService.login(req.user);

    return token;
  }

  /**
   * Create a new user
   *
   * @remarks This operation allows you to create a new user.
   * @throws {201} Created.
   * @throws {409} User already exists.
   */
  @Public()
  @Post('signup')
  async signup(@Body() userData: CreateUserDto) {
    const user = await this.userService.create(userData);

    const token = await this.authService.login(user);

    return token;
  }

  /**
   * Get the profile of the current user
   *
   * @remarks This operation allows you to get the profile of the current user.
   * @type {User}
   * @throws {200} User found.
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const { passwordHash: _passwordHash, ...user } =
      await this.userService.findOne(req.user.email);
    return user;
  }
}
