import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthHelper {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  constructor(private readonly jwt: JwtService) {}

  async decode(token: string) {
    return this.jwt.decode(token, null);
  }

  async validateUser(decoded: any): Promise<UserEntity> {
    return this.userRepository.findOne(decoded.id);
  }

  generateToken(user: UserEntity) {
    return this.jwt.sign({ id: user.id, username: user.username });
  }

  isPasswordValid(password: string, userPassword: string) {
    return bcrypt.compareSync(password, userPassword);
  }

  encodePassword(password: string) {
    const salt: string = bcrypt.getSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async validate(token: string): Promise<boolean | never> {
    const decoded = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
