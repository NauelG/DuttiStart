import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

interface CacheItem {
  url: string;
  expiration: number;
  response: HttpResponse<any>;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache = new Map<string, CacheItem>();

  constructor() { }

  public get(request: HttpRequest<any>): HttpResponse<any> | null {
    const item = this.cache.get(request.urlWithParams);
    if (!item) {
      return null;
    }

    const now = new Date().getTime();

    return item.expiration > now ? item.response : null;

  }

  public put( request: HttpRequest<any>, response: HttpResponse<any> ): void {
    const now = new Date().getTime();
    const item: CacheItem = {
      url: request.urlWithParams,
      expiration: now + environment.cache_age,
      response
    };

    this.cache.set(request.urlWithParams, item);

  }

}
