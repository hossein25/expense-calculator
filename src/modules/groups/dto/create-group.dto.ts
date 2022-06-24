import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  description?: string;

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  subscribers: string[];

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  expenses: string[];
}
