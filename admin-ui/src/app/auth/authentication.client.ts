import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiUrl + 'auth/login',
      {
        email: username,
        password: password,
      },
      { responseType: 'text' }
    );
  }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/user/register',
      {
        name: username,
        email: email,
        password: password,
      },
      { responseType: 'text' }
    );
  }
}
