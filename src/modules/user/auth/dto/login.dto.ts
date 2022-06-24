import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  public readonly username: string;

  @IsString()
  public readonly password: string;
}
