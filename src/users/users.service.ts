import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  saltRounds = 10;

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    createUserDto.password = this.hashPassword(createUserDto.password);
    await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.findUserByEmail(loginDto.email);

    if (!user) {
      throw Error('user not found');
    }

    console.log(user, loginDto);

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw Error('password not matches');
    }

    return await this.generateToken(user.id);
  }

  async generateToken(userId: string) {
    const secretKey = 'secret';
    const refresh_hash = (Math.random() + 1).toString(36).substring(7);
    const access_hash = (Math.random() + 1).toString(36).substring(7);
    const access_expires = Math.floor(Date.now() / 1000) + 60 * 60;
    const refresh_expires = Math.floor(Date.now() / 1000) + 60 * 60 * 12;

    const access_token = jwt.sign({ hash: access_hash }, secretKey, {
      expiresIn: access_expires,
    });

    const refresh_token = jwt.sign({ hash: refresh_hash }, secretKey, {
      expiresIn: refresh_expires,
    });

    await this.prisma.authentication.create({
      data: {
        access_token,
        refresh_token,
        access_token_expires: access_expires.toString(),
        refresh_token_expires: refresh_expires.toString(),
        access_token_hash: access_hash,
        refresh_token_hash: refresh_hash,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
        id: true,
      },
    });
  }

  async findUserByAccessToken(access: string) {
    return this.prisma.authentication.findFirst({
      where: {
        access_token: access,
      },
      select: {
        access_token_hash: true,
        access_token_expires: true,
        access_token: true,
      },
    });
  }
  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}
