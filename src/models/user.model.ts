import {
  BelongsToMany,
  Column,
  DataType, HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { RoleModel } from './roles.model';
import { UserRolesModel } from './user-roles.model';
import {PostsModel} from "./posts.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: "User's email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678', description: "User's password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Shown is user banned' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({
    example: 'Nasty behavior',
    description: 'Describe ban reason',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => RoleModel, () => UserRolesModel)
  roles: RoleModel[];

  @HasMany(() => PostsModel)
  posts: PostsModel[]
}
