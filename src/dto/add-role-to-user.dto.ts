import { ApiProperty } from '@nestjs/swagger';
import {IsNumber, IsString} from "class-validator";

export class AddRoleToUserDto {
  @ApiProperty({ example: 'ADMIN', description: 'Short name of role' })
  @IsString({ message: 'Value must be a string' })
  readonly value: string;

  @ApiProperty({
    example: '1',
    description: 'User ID',
  })
  @IsNumber({}, { message: 'User id must be a number' })
  readonly userId: number;
}
