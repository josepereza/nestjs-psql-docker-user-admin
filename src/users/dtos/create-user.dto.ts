import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { UserRoles } from 'src/users-roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]+$/, { message: 'full_name must contain only alphabetic characters' })
  full_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEnum(UserRoles, { message: 'Invalid role, leave this field empty' })
  role?: UserRoles = UserRoles.User;
}
