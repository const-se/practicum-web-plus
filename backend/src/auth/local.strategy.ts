import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super({ usernameField: 'email' })
    }

    public async validate(email: string, password: string) {
        const user = await this.authService.validate(email, password)

        if (user == null) {
            throw new UnauthorizedException()
        }

        return user
    }
}
