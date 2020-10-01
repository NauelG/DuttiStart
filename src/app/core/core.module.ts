import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService, CacheService, LocalStorageService } from './services';
import { CacheInterceptor } from './interceptors';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth-guard.service';

export const httpInterceptProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
];

@NgModule({
  providers: [
    httpInterceptProviders,
    ApiService,
    CacheService,
    LocalStorageService,
    AuthGuard
  ],
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
