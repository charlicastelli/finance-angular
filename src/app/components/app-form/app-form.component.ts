import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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
  form!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private service: FinanceService,
    private snackbar: MatSnackBar,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    //Criação de um novo item
    this.form = new FormGroup({
      _id: new FormControl(this.formData ? this.formData._id : ''),
      credit: new FormControl(this.formData ? this.formData.credit : '', [
        Validators.required,
      ]),
      description: new FormControl(
        this.formData ? this.formData.description : '', [
          Validators.required,
        ]
      ),
      category: new FormControl(this.formData ? this.formData.category : '', [
          Validators.required,
        ]),
      date: new FormControl(this.formData ? this.formData._date : ''),
    });

    //popular formulário para edição
    const add: Model = this.route.snapshot.data['finance'];
    this.form.setValue({
      _id: add._id,
      credit: add.credit,
      description: add.description,
      category: add.category,
      date: add._date,
    });
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
    this.messagesService.header('Sucesso');
    this.messagesService.add('Item salvo com sucesso!');
    this.onCancel();
  }

  private onError() {
    this.snackbar.open('Erro ao salvar item', 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  getErrorCredit() {
    return this.form.controls['credit'].invalid ||
      this.form.controls['credit'].hasError('required')
      ? 'Campo Obrigatório'
      : '';
  }

  getErrorDescription() {
    return this.form.controls['description'].invalid ||
      this.form.controls['description'].hasError('required')
      ? 'Campo Obrigatório'
      : '';
  }

  getErrorCategory() {
    return this.form.controls['category'].invalid ||
      this.form.controls['category'].hasError('required')
      ? 'Escolha uma categoria válida'
      : '';
  }
}
