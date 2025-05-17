import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class InvitedUserDto extends PickType(CreateUserDto, [
  'name',
  'email',
  'password',
]) {
  @ApiProperty({
    description: 'The token of the invite',
    example: '123456',
    required: true,
    type: String,
  })
  @IsString()
  inviteToken: string;
}
