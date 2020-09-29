import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserModel } from '../../core/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public viewPassword = false;
  public user: UserModel;
  public registerError = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = {};
  }

  public togglePassword(): void {
    this.viewPassword = !this.viewPassword;
  }

  public toLogin(): void {
    this.router.navigateByUrl('/login');
  }

  public register(): void {
    if (this.formValid()) {
      this.authService.register(this.user.name, this.user.surname, this.user.email, this.user.password).subscribe(
        res => {
          this.toLogin();
        }, err => {
          this.registerError = true;
        }
      )
    }
  }

  public formValid(): boolean {
    return !!this.user.email && !!this.user.password && !!this.user.name && !!this.user.surname;
  }

  public closeErrorAler(): void {
    this.registerError = false;
  }


}
