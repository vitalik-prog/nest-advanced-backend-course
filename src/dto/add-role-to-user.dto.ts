import { ApiProperty } from '@nestjs/swagger';

export class AddRoleToUserDto {
  @ApiProperty({ example: 'ADMIN', description: 'Short name of role' })
  readonly value: string;

  @ApiProperty({
    example: '1',
    description: 'User ID',
  })
  readonly userId: number | string;
}
