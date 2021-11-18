import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../dto/create-user.dto";
import {AuthService} from "./auth.service";
import {RoleModel} from "../models/roles.model";

@ApiTags('Authorization endpoints')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'JWT token return...' })
  @Post('/login')
  login (@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, description: 'JWT token return...' })
  @Post('/registration')
  registration (@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }
}
