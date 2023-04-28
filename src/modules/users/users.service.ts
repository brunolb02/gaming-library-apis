/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { LoginDTO } from '../auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: createUserDTO.email,
      },
    });

    if (user) {
      throw new HttpException('user_already_exists', HttpStatus.CONFLICT);
    }

    return await this.prisma.user.create({
      data: {
        email: createUserDTO.email,
        username: createUserDTO.username,
        password: await hash(createUserDTO.password, 10),
      },
    });
  }

  async updatePassword(
    id: number,
    updatePasswordDTO: UpdatePasswordDTO,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }

    const areEqual = await compare(
      updatePasswordDTO.oldPassword,
      user.password,
    );

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        password: await hash(updatePasswordDTO.newPassword, 10),
      },
    });
  }

  async findByLogin(loginDTO: LoginDTO): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email: loginDTO.email },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await compare(loginDTO.password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const { password: p, ...rest } = user;
    return rest;
  }

  async findByPayload({ email }: any): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }
}
