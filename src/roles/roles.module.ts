import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from '../models/roles.model';
import { UserModel } from '../models/user.model';
import { UserRolesModel } from '../models/user-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([RoleModel, UserModel, UserRolesModel])],
  exports: [RolesService],
})
export class RolesModule {}
