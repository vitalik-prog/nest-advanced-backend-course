import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '../dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { UserRolesModel } from '../models/user-roles.model';
import { RoleModel } from '../models/roles.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    @InjectModel(RoleModel) private roleRepository: typeof RoleModel,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue('USER');
    await user.$set('roles', [role.id]); // added roles to user instance
    return await this.findOne(user.id, role.id);
  }

  async findOne(id: string | number, roleId: string | number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      include: [{
        model: this.roleRepository,
        where: { id: roleId },
        attributes: ['id', 'value'],
      }],
    });
  }

  async getAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }
}
