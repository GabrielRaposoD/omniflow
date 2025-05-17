import type { Prisma } from '@repo/database';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto
  implements Omit<Prisma.UserCreateInput, 'passwordHash'>
{
  @ApiProperty({
    description: 'The email of the user',
    example: 'test@test.com',
    required: true,
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    required: true,
    type: String,
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'The name of the organization',
    example: 'Acme',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  organizationName: string;
}
