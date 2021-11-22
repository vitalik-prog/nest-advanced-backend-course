import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from '../models/user.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import {AddRoleToUserDto} from "../dto/add-role-to-user.dto";
import {BanUserDto} from "../dto/ban-user.dto";

@ApiTags('Users endpoints')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary:
      'Create user (it wrong way to create new user. You must use registration endpoint)',
  })
  @ApiResponse({ status: 200, type: UserModel })
  @Post()
  // @UsePipes(new ValidationPipe())
  create(@Body(new ValidationPipe()) userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard) // guard that restrict unauthorized users get info from this endpoint && second guard restrict access to not ADMIN users
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Set roles for users' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard) // guard that restrict unauthorized users get info from this endpoint && second guard restrict access to not ADMIN users
  @Post('/role')
  addRole(@Body() dto: AddRoleToUserDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: [UserModel] })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard) // guard that restrict unauthorized users get info from this endpoint && second guard restrict access to not ADMIN users
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
