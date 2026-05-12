import { CallHandler, ExecutionContext, HttpStatus, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { RpcException } from '@nestjs/microservices';
import { HTTP_MESSAGE } from '@common/constants/http-message.enum';


@Injectable()
export class TcpLoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const now = new Date();
        const handler = context.getHandler();
        const handlerName = handler.name;

        const agrs = context.getArgs();

        const params = agrs[0];
        const processId = params?.processId;

        Logger.log(`TCP >> Start process '${processId}' >> Method: ${handlerName} >> at: ${now.toISOString()} >> input: ${JSON.stringify(params)}`);

        return next.handle().pipe(
            tap((data) => {
                const duration = new Date().getTime() - now.getTime();
                Logger.log(`TCP >> End process '${processId}' >> Method: ${handlerName} >> at: ${new Date().toISOString()} >> duration: ${duration}ms >> output: ${JSON.stringify(data)}`);
            }
            ),
            catchError((error) => {
                const duration = Date.now() - now.getTime();
                Logger.error(
                    `TCP >> Error process '${processId}': ${error.message} >> data: ${JSON.stringify(
                        error,
                    )}, after: '${duration}'ms`
                );

                throw new RpcException({
                    code: error.status || error.code || error.error?.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error?.response?.message || error?.message || HTTP_MESSAGE.INTERNAL_SERVER_ERROR,

                })
            })
        )
    }
}