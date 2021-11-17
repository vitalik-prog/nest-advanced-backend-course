import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAll() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
