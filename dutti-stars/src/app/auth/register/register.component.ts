import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public viewPassword = false;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  public togglePassword(): void {
    this.viewPassword = !this.viewPassword;
  }

  public toLogin(): void {
    this._router.navigateByUrl('/login');
  }

}
