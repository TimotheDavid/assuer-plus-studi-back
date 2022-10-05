import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly user: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header) {
      throw new HttpException('header not found', HttpStatus.BAD_REQUEST);
    }

    const token = header.split(' ')[1];

    if (!token) {
      throw new HttpException('token not found', HttpStatus.BAD_REQUEST);
    }

    const decode = jwt.decode(token);
    const user = await this.user.findUserByAccessToken(token);

    if (decode.hash != user.access_token_hash) {
      throw new HttpException('token modified', HttpStatus.BAD_REQUEST);
    }

    if (!jwt.verify(token, process.env.SECRET_KEY)) {
      throw new HttpException('token has expired', HttpStatus.BAD_REQUEST);
    }


    /*  if (!jwt.verify(token)) {
        throw new HttpException(
          'token cannot be verified',
          HttpStatus.BAD_REQUEST,
        );
      }*/


    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    if (
      new Date(user.access_token_expires).getTime() > Date.now() &&
      process.env.TIME_CONTROLE
    ) {
      throw new HttpException('token has expired', HttpStatus.FORBIDDEN);
    }
    next();
  }
}
