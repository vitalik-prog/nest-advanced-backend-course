import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateUserDto} from "../dto/create-user.dto";
import {UserService} from "./user.service";

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }

  @Get()
  getAll () {
    return this.userService.getAll()
  }
}
