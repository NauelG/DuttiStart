import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';



@NgModule({
  providers: [
    ApiService
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
