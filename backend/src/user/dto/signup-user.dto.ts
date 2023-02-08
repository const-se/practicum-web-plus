import { IsEmail, IsString, MinLength } from 'class-validator'

export class SignupUserDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(2)
    password: string
}
