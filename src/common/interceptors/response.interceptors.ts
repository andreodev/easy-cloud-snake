import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface ServiceResponse<T = any> {
  message: string
  data?: T
}

@Injectable()
export class ResponseInterceptor<T extends ServiceResponse>
  implements NestInterceptor<T, any>
{
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data.message,
        data: data.data ?? null,
      })),
    )
  }
}
