import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  // service injection
  constructor(private readonly userServices: UsersService) {}
  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userServices.create(createUserDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}