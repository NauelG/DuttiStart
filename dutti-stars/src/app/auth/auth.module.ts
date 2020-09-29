import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  providers: [
    AuthService
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ]
})
export class AuthModule { }
