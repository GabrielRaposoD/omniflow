import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: { findOne: jest.Mock; update: jest.Mock };

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
      update: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersService },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return user if found', async () => {
      usersService.findOne.mockResolvedValue({ id: '1', email: 'a' });
      const result = await controller.findOne('1');
      expect(usersService.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual({ id: '1', email: 'a' });
    });
    it('should throw if user not found', async () => {
      usersService.findOne.mockRejectedValue(new Error('User not found'));
      await expect(controller.findOne('notfound')).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      usersService.update.mockResolvedValue({ id: '1', email: 'b' });
      const result = await controller.update('1', { email: 'b' } as any);
      expect(usersService.update).toHaveBeenCalledWith('1', { email: 'b' });
      expect(result).toEqual({ id: '1', email: 'b' });
    });
    it('should throw if user not found', async () => {
      usersService.update.mockRejectedValue(new Error('User not found'));
      await expect(
        controller.update('notfound', { email: 'b' } as any),
      ).rejects.toThrow('User not found');
    });
  });
});
