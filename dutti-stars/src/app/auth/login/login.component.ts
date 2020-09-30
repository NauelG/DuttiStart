import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
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
  private returnUrl: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = {};
    this.logout();
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.returnUrl = params['returnUrl'] || '/';
        console.log(this.returnUrl);
      }
    );
  }

  public togglePassword(): void {
    this.viewPassword = !this.viewPassword;
  }

  public toRegister(): void {
    this.router.navigateByUrl('/register');
  }

  public login(): void {
    this.authService.login(this.user.email, this.user.password).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      }, err => {
        this.loginError = true;
      }
    );
  }

  public closeErrorAler(): void {
    this.loginError = false;
  }

  private logout(): void {
    this.authService.logout().subscribe();
  }

}
