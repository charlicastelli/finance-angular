
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { MessagesService } from '../services/messages/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {
  formData: User | null = null;
  form!: FormGroup;

  username : string = '';
  password : string = '';
  user : User = new User();
  role : string = 'user';
  name : string = '';

  constructor(
    private authService : AuthService, 
    private router: Router, 
    private route: ActivatedRoute,
    private messagesService: MessagesService
    ) { }

  ngOnInit(): void {


    this.form = new FormGroup({
      name: new FormControl(this.formData ? this.formData.name : ''),
      username: new FormControl(this.formData ? this.formData.username : '', [
        Validators.required, Validators.email
      ]),
      password: new FormControl(this.formData ? this.formData.password : '', [
        Validators.required,
      ]),
      role: new FormControl(this.formData ? this.formData.role : 'user'),
      token: new FormControl(this.formData ? this.formData.token : ''),
    });

  }

  login() {
    this.user.username = this.username;
    this.user.password = this.password;
    this.user.role = this.role;
    this.user.name = this.name;

    this.authService.login(this.form.value).subscribe(res => {
      if(res === null) {
        this.onError();
        this.ngOnInit();

      }else {
        console.log("Login successful");
        localStorage.setItem("token",res.token);
        if(this.role === 'user') {
          this.router.navigate(['app-toolbar'], { relativeTo: this.route });
        } 

      }

    }, (err) => {
      this.onError();
      this.ngOnInit();
    })

  }

  signupButton() {
    if(this.role === 'user') {
      this.router.navigate(['signup'], { relativeTo: this.route });
    } 
  }

  async onError() {
    this.messagesService.header('Falha na autenticação');
    this.messagesService.add('Nome de usuário ou senha incorretos!');
  }
  

  // authenticatedUser() {
  //   if(this.auth === true) {
  //     console.log(this.auth);
  //     return true
  //   }
  //   return false;
  // }
}
