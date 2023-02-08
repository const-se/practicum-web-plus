import {
    ArgumentsHost,
    Catch,
    ExceptionFilter as BaseExceptionFilter,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { EntityNotFoundError } from 'typeorm'

@Catch()
export class ExceptionFilter implements BaseExceptionFilter {
    public catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const request = context.getRequest<Request>()
        const response = context.getResponse<Response>()

        if (exception instanceof EntityNotFoundError) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: { statusCode: StatusCodes.NOT_FOUND, message: 'Объект не найден' },
            })

            return
        }

        const e = exception instanceof HttpException
            ? exception
            : new InternalServerErrorException('Что-то пошло не так')

        response.status(e.getStatus()).json({
            message: e.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        })
    }
}
