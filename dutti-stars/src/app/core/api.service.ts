import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public get(url: string, params?: Params): Observable<any> {
    const callParams = this.getParams(params);
    return this.http.get(
      `${environment.api_url}${url}`,
    { params: callParams }
    ).pipe(
      catchError(this.parseError)
    );
  }

  public post(url: string, body: Object = {}): Observable<any> {
    const callBody = JSON.stringify(body);
    return this.http.post(
      `${environment.api_url}${url}`,
      callBody
    ).pipe(
      catchError(this.parseError)
    );
  }

  public put(url: string, body: Object = {}): Observable<any> {
    const callBody = JSON.stringify(body);
    return this.http.put(
      `${environment.api_url}${url}`,
      callBody
    ).pipe(
      catchError(this.parseError)
    );
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${url}`
    ).pipe(
      catchError(this.parseError)
    );
  }

  private getParams(params: Params = {}): HttpParams {
    return new HttpParams({
      fromObject: params
    });
  }

  private parseError(error): Observable<never> {
    return throwError(error.error);
  }
}
