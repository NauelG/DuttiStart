import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService, CacheService, LocalStorageService } from './services';
import { CacheInterceptor } from './interceptors';
import { FormsModule } from '@angular/forms';

export const httpInterceptProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
];

@NgModule({
  providers: [
    httpInterceptProviders,
    ApiService,
    CacheService,
    LocalStorageService
  ],
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
