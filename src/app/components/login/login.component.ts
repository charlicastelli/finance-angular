
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(this.formData ? this.formData.name : ''),
      username: new FormControl(this.formData ? this.formData.username : '', [
        Validators.required,
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
        alert("Username or password is wrong");
        this.ngOnInit();
      }else {
        console.log("Login successful");
        localStorage.setItem("token",res.token);

        if(this.role === 'user') {
          this.router.navigate(['app-toolbar'], { relativeTo: this.route });
        } 

      }

    }, err => {
      alert("Login falhou");
      this.ngOnInit();
    })

  }

  signupButton() {
    if(this.role === 'user') {
      this.router.navigate(['signup'], { relativeTo: this.route });
    } 
  }


}
