import { Test, type TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const mockUser = {
  id: 'user-id',
  email: 'test@example.com',
  passwordHash: 'hashedpw',
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: { findOne: jest.Mock };
  let jwtService: { sign: jest.Mock };

  beforeEach(async () => {
    usersService = { findOne: jest.fn() };
    jwtService = { sign: jest.fn() };
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(
        async (pw, hash) => pw === 'password' && hash === 'hashedpw',
      );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'UsersService', useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    })
      .overrideProvider('UsersService')
      .useValue(usersService)
      .overrideProvider(JwtService)
      .useValue(jwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data without passwordHash if credentials are valid', async () => {
      usersService.findOne.mockResolvedValue(mockUser);
      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toEqual({ id: 'user-id', email: 'test@example.com' });
    });

    it('should return null if user not found', async () => {
      usersService.findOne.mockResolvedValue(null);
      const result = await service.validateUser(
        'notfound@example.com',
        'password',
      );
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      usersService.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      const result = await service.validateUser(
        'test@example.com',
        'wrongpassword',
      );
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      jwtService.sign.mockReturnValue('signed-token');
      const result = await service.login({
        email: 'test@example.com',
        id: 'user-id',
      });
      expect(result).toEqual({ access_token: 'signed-token' });
    });
  });
});
