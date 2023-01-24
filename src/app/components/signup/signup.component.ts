import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from '../services/auth/auth.service';
import { MessagesService } from '../services/messages/messages.service';

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

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  

  constructor(
    private authService : AuthService, 
    private router: Router, 
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.formData ? this.formData.name : '', [
        Validators.required
      ]),
      username: new FormControl(this.formData ? this.formData.username : '', [
        Validators.required, Validators.email
      ]),
      password: new FormControl(this.formData ? this.formData.password : '', [
        Validators.required, Validators.minLength(8)
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
        this.userExists();
        this.ngOnInit();
      }else {
        this.openSnackBar();
        this.router.navigate(['/'], { relativeTo: this.route });
      }
    }, err => {
      this.onError();
      this.ngOnInit();
    })

  }

  back() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  async userExists() {
    this.messagesService.header('Falha no seu registro');
    this.messagesService.add('Usuário já possui cadastro!');
  }

  async onError() {
    this.messagesService.header('Falha no seu registro');
    this.messagesService.add('Falha na comunicação com servidor!');
  }


  openSnackBar() {
    this.snackBar.open('Registro efetuado com sucesso!', 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}
