import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async updateUser(updateUserDto: UpdateUserDto, request: Request) {
    const user = (request as any).user as UserEntity;
    user.name = updateUserDto.name;

    return this.userRepository.save(user);
  }
}
