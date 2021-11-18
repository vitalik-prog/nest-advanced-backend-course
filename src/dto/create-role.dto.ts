import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: "Short describe of role" })
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: "Long describe of role" })
  readonly description: string;
}
