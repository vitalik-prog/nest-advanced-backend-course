import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { UserModel } from './user.model';

@ApiTags('Users endpoints')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: UserModel })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
