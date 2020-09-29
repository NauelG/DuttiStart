import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../core/models/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public viewPassword = false;
  public user: UserModel;
  public loginError = false;

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

  public toRegister(): void {
    this.router.navigateByUrl('/register');
  }

  public login() {
    this.authService.login(this.user.email, this.user.password).subscribe(
      res => {
        this.router.navigateByUrl('/');
      }, err => {
        this.loginError = true;
      }
    );
  }

  public closeErrorAler(): void {
    this.loginError = false;
  }

}
