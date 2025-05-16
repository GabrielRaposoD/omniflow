import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@repo/api';

const mockUser = {
  id: 'user-id',
  email: 'test@example.com',
  passwordHash: 'hashedpw',
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: { login: jest.Mock };
  let usersService: { create: jest.Mock; findOne: jest.Mock };

  beforeEach(async () => {
    authService = { login: jest.fn() };
    usersService = { create: jest.fn(), findOne: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return a token for valid user', async () => {
      const req = { user: mockUser };
      authService.login.mockResolvedValue({ access_token: 'token' });
      const result = await controller.login(req);
      expect(result).toEqual({ access_token: 'token' });
      expect(authService.login).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('register', () => {
    it('should create user and return a token', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        passwordHash: 'pw',
      } as any;
      usersService.create.mockResolvedValue(mockUser);
      authService.login.mockResolvedValue({ access_token: 'token' });
      const result = await controller.register(dto);
      expect(usersService.create).toHaveBeenCalledWith(dto);
      expect(authService.login).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('getProfile', () => {
    it('should return user profile without passwordHash', async () => {
      usersService.findOne.mockResolvedValue(mockUser);
      const req = { user: { email: 'test@example.com' } };
      const result = await controller.getProfile(req);
      expect(usersService.findOne).toHaveBeenCalledWith('test@example.com');
      expect(result).toEqual({ id: 'user-id', email: 'test@example.com' });
    });
  });
});
