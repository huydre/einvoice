import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

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
            }),
        )
    }
}