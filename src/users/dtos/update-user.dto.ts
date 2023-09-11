import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator'

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Matches(/^[A-Za-zÁáÉéÍíÓóÚúÜü\s]+$/, { message: 'full_name must contain only alphabetic characters' })
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
}
