import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

@Injectable()
export class DatabaseConfigService {
    constructor(
        private readonly configService: ConfigService,
    ) {
    }

    public getDatabaseConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('POSTGRES_HOST', 'postgres'),
            username: this.configService.get<string>('POSTGRES_USER', 'root'),
            password: this.configService.get<string>('POSTGRES_PASSWORD', 'root'),
            database: this.configService.get<string>('POSTGRES_DB', 'test'),
            autoLoadEntities: true,
            synchronize: true,
        } as TypeOrmModuleOptions
    }
}
