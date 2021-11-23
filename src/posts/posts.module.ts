import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {RoleModel} from "../models/roles.model";
import {UserModel} from "../models/user.model";
import {UserRolesModel} from "../models/user-roles.model";
import {PostsModel} from "../models/posts.model";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([UserModel, PostsModel]),
    FilesModule
  ],
})
export class PostsModule {}
