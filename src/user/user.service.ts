import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '../dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { UserRolesModel } from '../models/user-roles.model';
import { RoleModel } from '../models/roles.model';
import {AddRoleToUserDto} from "../dto/add-role-to-user.dto";
import {BanUserDto} from "../dto/ban-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    @InjectModel(RoleModel) private roleRepository: typeof RoleModel,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]); // added roles to user instance
    user.roles = [role];
    return await this.findOne(user.id, role.id);
  }

  async findOne(id: string | number, roleId: string | number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      include: [
        {
          model: this.roleRepository,
          where: { id: roleId },
          attributes: ['id', 'value'],
        },
      ],
    });
  }

  async getAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleToUserDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.rolesService.getRoleByValue(dto.value)
    if (role && user) {
      await user.$add('role', role.id)
      return await this.findOne(user.id, role.id);
    }
    throw new HttpException('Role or user not found', HttpStatus.NOT_FOUND)
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    user.banned = true
    user.banReason = dto.banReason
    await user.save()
    return user
  }
}
