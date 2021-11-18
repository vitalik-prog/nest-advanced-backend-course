import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from './user.model';
import { UserRolesModel } from './user-roles.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: "User's role value" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'Administrator',
    description: "User's role description",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => UserModel, () => UserRolesModel)
  users: UserModel[];
}
