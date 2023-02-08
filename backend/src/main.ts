import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExceptionFilter } from './exception/exception.filter'
import { TypeormInterceptor } from './typeorm/typeorm.interceptor'

const PORT = 8001

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.enableCors()
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
    app.useGlobalFilters(new ExceptionFilter())
    app.useGlobalInterceptors(new TypeormInterceptor())

    await app.listen(PORT)
}

bootstrap()
