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

  login(user : User) : Observable<User> {
    return this.httpClient.post<User>(this.loginUrl,user);
  }

  signUp(user : User) : Observable<User> {
    return this.httpClient.post<User>(this.signUpUrl,user);
  }


  authenticatedUser() {
    if(this.login === null) {
      return false;
    }
    return true;
  }
}
