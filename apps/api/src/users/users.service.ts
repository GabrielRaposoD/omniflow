import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@repo/api';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: CreateUserDto) {
    const passwordHash = await bcrypt.hash(userData.password, 10);

    const {
      password: _password,
      organizationName,
      ...parsedUserData
    } = userData;

    const user = await this.prisma.user.create({
      data: {
        ...parsedUserData,
        passwordHash,
        tenantRoles: {
          create: {
            tenant: {
              create: {
                name: organizationName,
              },
            },
            role: 'ADMIN',
          },
        },
      },
      include: {
        tenantRoles: {
          select: {
            role: true,
            tenantId: true,
          },
        },
      },
    });

    const { tenantRoles, ...userWithoutTenantRoles } = user;

    const newUser = {
      ...userWithoutTenantRoles,
      tenantId: tenantRoles[0].tenantId,
      role: tenantRoles[0].role,
    };

    return newUser;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(idOrEmail: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: idOrEmail,
        OR: [{ id: idOrEmail }],
      },
      include: {
        tenantRoles: {
          select: {
            role: true,
            tenantId: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { tenantRoles, ...userWithoutTenantRoles } = user;

    const newUser = {
      ...userWithoutTenantRoles,
      tenantId: tenantRoles[0].tenantId,
      role: tenantRoles[0].role,
    };

    return newUser;
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
