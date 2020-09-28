import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './cache.interceptor';

export const httpInterceptProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
];

@NgModule({
  providers: [
    httpInterceptProviders,
    ApiService
  ],
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class CoreModule { }
