import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { HashService } from '../hash/hash.service'
import { User } from '../user/entity/user.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    ) {
    }

    public async validate(email: string, password: string) {
        const user = await this.userService.findOne({
            select: { id: true, email: true, password: true },
            where: { email },
        })

        if (user && (await this.hashService.verify(password, user.password))) {
            const { password, ...result } = user

            return result as User
        }

        return null
    }

    public async signin(user: User) {
        const { id: sub, email } = user

        return { accessToken: await this.jwtService.signAsync({ email, sub }), user }
    }
}
