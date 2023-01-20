import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl : string = '';
  signUpUrl : string = '';

  constructor(private httpClient : HttpClient) { 
    this.loginUrl = "http://localhost:8080/auth/login";
    this.signUpUrl = "http://localhost:8080/auth/register";
  }

  login(user : User) : Observable<any> {
    return this.httpClient.post<any>(this.loginUrl,user);
  }

  signUp(user : User) : Observable<any> {
    return this.httpClient.post<any>(this.signUpUrl,user);
  }
}
