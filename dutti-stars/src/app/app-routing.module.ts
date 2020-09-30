import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { StarshipListComponent } from './starship/starship-list/starship-list.component';
import { AuthGuard } from './core/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: StarshipListComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      useHash: true
    }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
