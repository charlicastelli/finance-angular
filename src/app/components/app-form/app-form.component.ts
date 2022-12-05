import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { ActivatedRoute } from '@angular/router';
import { Model } from 'src/app/model/model';
import { MessagesService } from '../services/messages/messages.service';

import { FinanceService } from './../services/finance.service';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss'],
})
export class AppFormComponent implements OnInit {
  formData: Model | null = null;

  // form = this.formBuilder.group({
  //   _id: [''],
  //   credit: [0],
  //   description: [''],
  //   category: [''],
  // });

  form!: FormGroup;

  constructor(
    //sempre que usar o NonNullableFormBuilder tenho que importar no module o ReactiveFormsModule
    //private formBuilder: NonNullableFormBuilder,
    private location: Location,
    //private route: ActivatedRoute,
    private service: FinanceService,
    private snackbar: MatSnackBar,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      _id: new FormControl(this.formData ? this.formData._id : ''),
      credit: new FormControl(this.formData ? this.formData.credit : '', [
        Validators.required,
      ]),
      description: new FormControl(
        this.formData ? this.formData.description : ''
      ),
      category: new FormControl(this.formData ? this.formData.category : ''),
    });
    // const add: Model = this.route.snapshot.data['add'];
    // this.form.setValue({
    //   _id: add._id,
    //   credit: add.credit,
    //   description: add.description,
    //   category: add.category
    // });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  async onSuccess() {
    this.messagesService.add('Item salvo com sucesso!');
    //this.snackbar.open('Item salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    //this.messagesService.add('Erro ao salvar Item!');
    this.snackbar.open('Erro ao salvar item.', '', { duration: 5000 });
  }
}
