import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtPayload } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

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

  async login(loginDTO: LoginDTO): Promise<AuthEntity> {
    const user = await this.usersService.findByLogin(loginDTO);

    if (!user) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }

    const accessToken = this.generateAccessToken(user);

    return {
      ...accessToken,
      data: user,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);

    if (!user) {
      throw new HttpException('invalid_token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  private generateAccessToken({ email }): any {
    const user: JwtPayload = { email };
    const authorization = this.jwtService.sign(user);

    return {
      expiresIn: this.configService.getOrThrow('JWT_EXPIRATION_TIME'),
      authorization,
    };
  }
}
