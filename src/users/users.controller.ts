import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (process.env.SECURITY === 'true') {
      return this.usersService.create(createUserDto);
    } else {
      return new HttpException(
        'the routes is not allowed in production',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.usersService.login(loginUserDto);
    return {
      token: token.access_token,
      expires: token.expires,
      userId: token.userId,
    };
  }
}
