import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '@repo/api';

jest.mock('bcrypt', () => ({
  hash: jest.fn(async (pw) => `hashed-${pw}`),
}));

describe('UsersService', () => {
  let service: UsersService;
  let prisma: { user: any };

  beforeEach(async () => {
    prisma = {
      user: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should hash password and create user', async () => {
      prisma.user.create.mockResolvedValue({
        id: '1',
        email: 'a',
        passwordHash: 'hashed-pw',
      });
      const dto = { email: 'a', passwordHash: 'pw' } as CreateUserDto;
      const result = await service.create(dto);
      expect(bcrypt.hash).toHaveBeenCalledWith('pw', 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { ...dto, passwordHash: 'hashed-pw' },
      });
      expect(result).toEqual({
        id: '1',
        email: 'a',
        passwordHash: 'hashed-pw',
      });
    });
  });

  describe('findOne', () => {
    it('should return user if found', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: '1', email: 'a' });
      const result = await service.findOne('1');
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual({ id: '1', email: 'a' });
    });
    it('should throw if user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(service.findOne('notfound')).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      prisma.user.update.mockResolvedValue({ id: '1', email: 'b' });
      const result = await service.update('1', { email: 'b' } as UpdateUserDto);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { email: 'b' },
      });
      expect(result).toEqual({ id: '1', email: 'b' });
    });
    it('should throw if user not found', async () => {
      prisma.user.update.mockResolvedValue(null);
      await expect(
        service.update('notfound', { email: 'b' } as UpdateUserDto),
      ).rejects.toThrow('User not found');
    });
  });

  describe('remove', () => {
    it('should delete user', async () => {
      prisma.user.delete.mockResolvedValue({ id: '1', email: 'a' });
      const result = await service.remove('1');
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual({ id: '1', email: 'a' });
    });
    it('should throw if user not found', async () => {
      prisma.user.delete.mockResolvedValue(null);
      await expect(service.remove('notfound')).rejects.toThrow(
        'User not found',
      );
    });
  });
});
