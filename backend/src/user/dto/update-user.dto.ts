import { IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
    @IsString()
    @MinLength(2)
    password: string
}
