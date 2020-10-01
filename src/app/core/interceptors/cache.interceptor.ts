import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { CacheService } from '../services';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(
    private cache: CacheService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!this.requestCacheable(request)) {
      return next.handle(request);
    }

    const cacheResponse = this.cache.get(request);

    if (cacheResponse) {
      return of(cacheResponse);
    }

    return next.handle(request).pipe(
      map( response => {
        if ( response instanceof HttpResponse ) {
          this.cache.put(request, response);
        }
        return response;
      })
    );

  }

  private requestCacheable(request: HttpRequest<any>): boolean {
    return request.method === 'GET';
  }
}
