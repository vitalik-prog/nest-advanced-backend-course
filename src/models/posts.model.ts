import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType, ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { RoleModel } from './roles.model';
import { UserRolesModel } from './user-roles.model';
import {UserModel} from "./user.model";

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number
  image: string
}

@Table({ tableName: 'posts' })
export class PostsModel extends Model<PostsModel, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'title', description: "Post title" })
  @Column({ type: DataType.STRING })
  title: string;

  @ApiProperty({ example: 'any content', description: "Post content" })
  @Column({ type: DataType.STRING })
  content: string;

  @ApiProperty({ example: 'Image URI', description: "URI for image" })
  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => UserModel)
  author: UserModel;
}
