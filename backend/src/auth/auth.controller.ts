import { Body, ClassSerializerInterceptor, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common'
import { SigninUserDto } from '../user/dto/signin-user.dto'
import { SignupUserDto } from '../user/dto/signup-user.dto'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    public async signin(@Request() request, @Body() signinUserDto: SigninUserDto) {
        return this.authService.signin(request.user)
    }

    @Post('signup')
    public async signup(@Body() signupUserDto: SignupUserDto) {
        return await this.userService.signup(signupUserDto)
    }
}
