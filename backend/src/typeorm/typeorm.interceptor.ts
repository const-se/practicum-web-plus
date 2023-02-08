import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { PostgresError } from 'pg-error-enum'
import { catchError, Observable } from 'rxjs'
import { QueryFailedError } from 'typeorm'

@Injectable()
export class TypeormInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(catchError((error: unknown) => {
            if (!(error instanceof QueryFailedError)) {
                throw error
            }

            const { code = -1 } = error.driverError || {}

            if (code != PostgresError.UNIQUE_VIOLATION) {
                throw error
            }

            throw new ConflictException()
        }))
    }
}
