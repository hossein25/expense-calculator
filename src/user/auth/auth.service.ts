import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { AuthHelper } from './auth.helper';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(AuthHelper) private readonly authHelper: AuthHelper,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity | never> {
    const { password, username, email, name } = registerDto;

    let user = await this.userRepository.findOne({ where: { username } });

    if (user) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

    user = new UserEntity();
    user.username = username;
    user.email = email;
    user.name = name;
    user.password = this.authHelper.encodePassword(password);

    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto) {
    const { password, username } = loginDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = this.authHelper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.userRepository.update(user.id, { lastLoginAt: new Date() });

    return this.authHelper.generateToken(user);
  }

  async refresh(user: UserEntity) {
    this.userRepository.update(user.id, { lastLoginAt: new Date() });
    return this.authHelper.generateToken(user);
  }
}
