import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, Scope } from '../config/config.module'
import { SecurityConfigService } from '../config/security-config.service'
import { HashModule } from '../hash/hash.module'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

@Module({
    imports: [
        ConfigModule.register(Scope.Security),
        UserModule,
        HashModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule.register(Scope.Security)],
            inject: [SecurityConfigService],
            useFactory: async (configService: SecurityConfigService) => configService.getJwtConfig(),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {
}
