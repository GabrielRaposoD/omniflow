import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@repo/api';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: CreateUserDto) {
    const passwordHash = await bcrypt.hash(userData.passwordHash, 10);

    const user = await this.prisma.user.create({
      data: { ...userData, passwordHash },
    });

    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
