import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from '../models/user.model';
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

@ApiTags('Users endpoints')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create user (it wrong way to create new user. You must use registration endpoint)' })
  @ApiResponse({ status: 200, type: UserModel })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @UseGuards(JwtAuthGuard) // guard that restrict unauthorized users get info from this endpoint
  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
