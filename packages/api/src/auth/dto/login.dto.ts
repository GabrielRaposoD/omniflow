import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "The email of the user",
    example: "test@test.com",
    required: true,
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "The password of the user",
    example: "password",
    required: true,
    minLength: 8,
    type: String,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
