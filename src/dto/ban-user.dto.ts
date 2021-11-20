import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({
    example: '1',
    description: 'User ID',
  })
  readonly userId: number | string;

  @ApiProperty({ example: 'For insane', description: 'Short description of ban reason' })
  readonly banReason: string;
}
