import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap, Observable } from 'rxjs';

@Injectable()
export class CouponInterceptorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        if (statusCode >= 200 && statusCode < 300) {
          data.success = true;
        } else {
          data.success = false;
        }
        data.statusCode = statusCode;
      }),
    );
  }
}
