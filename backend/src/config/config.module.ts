import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule as BaseConfigModule } from '@nestjs/config'
import { DatabaseConfigService } from './database-config.service'
import { SecurityConfigService } from './security-config.service'

export enum Scope {
    Database,
    Security,
}

@Module({})
export class ConfigModule {
    static register(scope: Scope): DynamicModule {
        const providers = []

        switch (scope) {
            case Scope.Database:
                providers.push(DatabaseConfigService)
                break
            case Scope.Security:
                providers.push(SecurityConfigService)
                break
        }

        return {
            module: ConfigModule,
            imports: [BaseConfigModule.forRoot()],
            providers,
            exports: providers,
        }
    }
}
