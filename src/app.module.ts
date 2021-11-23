import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './models/user.model';
import * as path from 'path'
import { RolesModule } from './roles/roles.module';
import { RoleModel } from './models/roles.model';
import { UserRolesModel } from './models/user-roles.model';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {PostsModel} from "./models/posts.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRESS_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DB,
      models: [UserModel, RoleModel, UserRolesModel, PostsModel],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UserModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {}
