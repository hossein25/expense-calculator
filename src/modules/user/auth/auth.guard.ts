import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserEntity } from '../user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public handleRequest(err: any, user: UserEntity): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user as UserEntity;
  }

  public async canValidate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request: Request = context.switchToHttp().getRequest();

    return (request as any).user ? true : false;
  }
}
