import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: "User's password" })
  readonly password: string;
}
