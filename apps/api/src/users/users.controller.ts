import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from '@repo/api';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Find user by email or id
   *
   * @throws {404} User not found.
   */
  @Get(':query')
  async findOne(@Param('query') query: string) {
    const user = await this.usersService.findOne(query);
    return user;
  }

  /**
   * Update user
   *
   * @param id The id of the user
   * @param updateUserDto The user data
   *
   * @throws {404} User not found.
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);

    const { passwordHash: _passwordHash, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
