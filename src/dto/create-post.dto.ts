import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'title', description: 'Post title' })
  readonly title: string;

  @ApiProperty({
    example: 'content',
    description: 'Any content',
  })
  readonly content: string;

  @ApiProperty({
    example: '1',
    description: 'User id',
  })
  readonly userId: number;
}
