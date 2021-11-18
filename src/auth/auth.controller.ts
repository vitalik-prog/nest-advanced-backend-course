import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../dto/create-user.dto";
import {AuthService} from "./auth.service";

@ApiTags('Authorization endpoints')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/login')
  login (@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @Post('/registration')
  registration (@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }
}
