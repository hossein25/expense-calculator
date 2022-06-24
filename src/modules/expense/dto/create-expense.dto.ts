import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  description?: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsUUID()
  payerId: string;

  @IsString()
  @IsUUID()
  groupId: string;
}
