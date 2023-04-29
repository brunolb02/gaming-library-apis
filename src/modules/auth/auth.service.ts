import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtPayload } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDTO: CreateUserDTO): Promise<number> {
    try {
      await this.usersService.create(createUserDTO);

      return HttpStatus.CREATED;
    } catch (error) {
      throw error;
    }
  }

  async login(loginDTO: LoginDTO): Promise<string> {
    const user = await this.usersService.findByLogin(loginDTO);

    if (!user) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }

    return this.jwtService.sign({
      id: user.id,
      email: loginDTO.email,
    });
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findByPayload(payload);

    if (!user) {
      throw new HttpException('invalid_token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
