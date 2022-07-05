import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginURL: string = `${environment.backendURL}/api/user/login`;
  private signupURL: string = `${environment.backendURL}/api/user/signup`;

  constructor(private http: HttpClient) {}

  public sendLogin(body: {}): Observable<{}> {
    return this.http.post<{}>(this.loginURL, body);
  }
  public sendSignUp(body: {}): Observable<{}> {
    return this.http.post<{}>(this.signupURL, body);
  }
  public testToken(body: {}): Observable<any> {
    return this.http.get<any>(
      'https://gorip-back.herokuapp.com/api/user/token',
      body
    );
  }
}
