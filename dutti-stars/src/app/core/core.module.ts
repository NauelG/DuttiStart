import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService, CacheService } from './services';
import { CacheInterceptor } from './interceptors';

export const httpInterceptProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
];

@NgModule({
  providers: [
    httpInterceptProviders,
    ApiService,
    CacheService
  ],
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class CoreModule { }
