import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Input correct email' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: "User's password" })
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'More than 4 and less then 16 symbols' })
  readonly password: string;
}
