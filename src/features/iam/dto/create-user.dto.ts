import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;
}
