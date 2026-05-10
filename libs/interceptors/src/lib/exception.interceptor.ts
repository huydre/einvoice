import { CallHandler, ExecutionContext, HttpException, HttpStatus, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { MetaDataKeys } from '@common/constants/common.constants';
import { catchError, map, Observable } from 'rxjs';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { HTTP_MESSAGE } from '@common/constants/http-message.enum';

export class ExceptionInterceptor implements NestInterceptor {
    private readonly logger = new Logger(ExceptionInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const request: Request & { [MetaDataKeys.PROCESS_ID]: string;[MetaDataKeys.START_TIME]: number } = ctx.getRequest();
        const processId = request[MetaDataKeys.PROCESS_ID];
        const startTime = request[MetaDataKeys.START_TIME];

        return next.handle().pipe(map((data: ResponseDto<unknown>) => {
            const duration = Date.now() - startTime;
            data.processId = processId;
            data.duration = `${duration}ms`;

            return data;
        }),
            catchError((error) => {
                this.logger.error({ error });

                const durationMs = Date.now() - startTime;

                const message = error?.response?.message || error?.message || error || HTTP_MESSAGE.INTERNAL_SERVER_ERROR;
                const statusCode = error?.code || error?.response?.statusCode || error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

                throw new HttpException(new ResponseDto({ data: null, message, statusCode, duration: `${durationMs}ms`, processId }), statusCode);
            }
            )
        )
    }
}