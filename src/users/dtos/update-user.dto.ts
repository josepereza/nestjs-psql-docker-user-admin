import { IsEmail, IsEnum, IsOptional, IsString, Matches, MinLength, isString, minLength } from 'class-validator'
import { UserRoles } from 'src/users-roles.enum'

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Matches(/^[A-Za-z]+$/, { message: 'full_name must contain only alphabetic characters' })
    full_name?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string

    @IsOptional()
    @IsString()
    phone?: string

    @IsOptional()
    @IsEnum(UserRoles, { message: 'Invalid role' })
    role?: UserRoles
}
