import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { CreateUserDTO } from '../users/dto/create-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    return await this.authService.register(createUserDTO);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }
}
