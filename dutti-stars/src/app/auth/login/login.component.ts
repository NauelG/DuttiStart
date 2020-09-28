import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public viewPassword = false;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  public togglePassword(): void {
    this.viewPassword = !this.viewPassword;
  }

  public toRegister(): void {
    this._router.navigateByUrl('/register');
  }

}
