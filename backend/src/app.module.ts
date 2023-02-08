import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, Scope } from './config/config.module'
import { DatabaseConfigService } from './config/database-config.service'
import { HashModule } from './hash/hash.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.register(Scope.Database)],
            inject: [DatabaseConfigService],
            useFactory: async (configService: DatabaseConfigService) => configService.getDatabaseConfig(),
        }),
        HashModule,
        UserModule,
        AuthModule,
    ],
})
export class AppModule {
}
