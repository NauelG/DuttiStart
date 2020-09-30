import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services';
import { LocalStorageItems, UserModel } from '../core/models';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private USERS: UserModel[] = [];

  constructor(
    private api: ApiService,
    private localeStorageService: LocalStorageService
  ) {

  }

  public login(email: string, password: string): Observable<UserModel> {
    const body = {
      email,
      password
    };
    //return this.api.post('auth/login', body)
    return this.fakeLogin(body)
      .pipe(map( res => {
        this.localeStorageService.set(LocalStorageItems.user, res)
        return res;
      }));
  }

  public logout(): Observable<void> {
    // return this.api.delete('/auth/logout/')
    return this.fakeLogout().pipe(map( res => {
      this.localeStorageService.delete(LocalStorageItems.user);
    }));
  }

  public register(name: string, surname: string, email: string, password: string): Observable<UserModel> {
    const body = {
      name,
      surname,
      email,
      password
    };
    //return this.api.post('auth/register', body)
    return this.fakeRegister(body);
  }

  // Mock functions :)

  private fakeLogin( body: { email: string, password: string } ): Observable<UserModel> {
    this.loadState();
    const _this = this;
    const ret: Observable<UserModel> = new Observable(subscriber => {
      const user = _this.USERS.find(e => e.email === body.email);
      const hashedPassword = _this.hashPassword(body.password);
      if (!user || user.password !== hashedPassword) {
        subscriber.error('Login error');
      } else {
        user.token = btoa(`${new Date().getTime()}:${user.id}:${user.email}`);
        setTimeout(() => {
          this.saveState();
          subscriber.next({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            token: user.token
          });
        }, 1000);
        }
      });
    return ret;
  }

  private fakeLogout( ): Observable<void> {
    const ret: Observable<void> = new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next();
      }, 1000);
    });
    return ret;
  }

  private fakeRegister( body: { name: string, surname: string, email: string, password: string } ): Observable<UserModel> {
    const _this = this;
    this.loadState();
    const ret: Observable<UserModel> = new Observable(subscriber => {
      const userWithSameEmail = _this.USERS.find(e => e.email === body.email);
      if (userWithSameEmail) {
        subscriber.error('Email taken');
      } else {
        const newId = _this.USERS.length > 0 ?  _this.USERS.reduce((pre, current) => {
          return pre.id > current.id ? pre : current;
        }).id + 1 : 1;
        const user: UserModel = {
          id: newId,
          name: body.name,
          surname: body.surname,
          email: body.email,
          password: _this.hashPassword(body.password)
        };
        _this.USERS.push(user);
        setTimeout(() => {
          this.saveState();
          subscriber.next({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email
          });
        }, 1000);
      }
    });
    return ret;
  }

  private loadState(): void {
    this.USERS = this.localeStorageService.get(LocalStorageItems.STATE) || [];
  }

  private saveState(): void {
    this.localeStorageService.set(LocalStorageItems.STATE, this.USERS);
  }



  // Fake function that simulates a real hashing protocol.
  private hashPassword(password: string): string {
    const superSecretString = 'superSecretString';
    const secret = password.length > superSecretString.length ?
      superSecretString.slice(0, password.length) :
      superSecretString.repeat((password.length / superSecretString.length) + 1).slice(0, password.length);
    let ret = '';
    for (let i = 0; i > password.length; i++) {
      ret += String.fromCharCode((password.charCodeAt(i)) ^ (secret.charCodeAt(i)))
    }
    return ret;
  }

}
