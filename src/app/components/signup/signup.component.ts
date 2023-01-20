import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formData: User | null = null;
  form!: FormGroup;
  
  name : string = '';
  username : string = '';
  password : string = '';

  user : User = new User();
  

  constructor(
    private authService : AuthService, 
    private router: Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.formData ? this.formData.name : '', [
        Validators.required,
      ]),
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

  signup() {

    this.user.username = this.username;
    this.user.password = this.password;
    this.user.name = this.name;
    this.user.role = 'user';

    this.authService.signUp(this.form.value).subscribe(res => {
      if(res === null) {
        alert("Registration failed");
        this.ngOnInit();
      }else {
        console.log("Registration successful");
        alert("Registration successful");
        this.router.navigate(['/'], { relativeTo: this.route });
      }
    }, err => {
      alert("Registration failed.");
      this.ngOnInit();
    })

  }

  back() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

}
