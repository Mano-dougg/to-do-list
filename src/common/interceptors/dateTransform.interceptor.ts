import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DateTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        return this.recursivelyTransformDates(data);
      }),
    );
  }

  private recursivelyTransformDates(data: any): any {
    if (data === null || data === undefined) {
      return data;
    }

    if (data instanceof Date) {
      // Ajusta para o fuso horário do Brasil (UTC-3)
      return new Date(data.getTime() - 3 * 60 * 60 * 1000);
    }

    if (Array.isArray(data)) {
      return data.map(item => this.recursivelyTransformDates(item));
    }

    if (typeof data === 'object') {
      const result = { ...data };
      
      for (const key of Object.keys(result)) {
        const value = result[key];
        
        if (value instanceof Date) {
          // Ajusta para o fuso horário do Brasil (UTC-3)
          result[key] = new Date(value.getTime() - 3 * 60 * 60 * 1000);
        } else if (value !== null && typeof value === 'object') {
          result[key] = this.recursivelyTransformDates(value);
        }
      }
      
      return result;
    }

    return data;
  }
}