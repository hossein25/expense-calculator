import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Put('update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() request: Request) {
    return this.userService.updateUser(updateUserDto, request);
  }
}
