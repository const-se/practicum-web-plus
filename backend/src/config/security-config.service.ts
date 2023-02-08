import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

@Injectable()
export class SecurityConfigService {
    constructor(
        private readonly configService: ConfigService,
    ) {
    }

    public getSecret(): string {
        return this.configService.get<string>('SECRET', 'secret')
    }

    public getJwtConfig(): JwtModuleOptions {
        return { secret: this.getSecret(), signOptions: { expiresIn: '1d' } }
    }
}
