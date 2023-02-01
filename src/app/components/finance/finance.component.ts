import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Model } from 'src/app/model/model';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/dialog/error-dialog/error-dialog.component';

import { FinanceService } from '../services/finance.service';
import { MessagesService } from '../services/messages/messages.service';
import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';

import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

//formata a data de exibição
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MMMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
})
export class FinanceComponent implements OnInit {
  finance$: Observable<Model[]>;

  tokenAuthenticatedNow?: string = localStorage.getItem('token')?.toString();

  //Paga a data atual
  date = new FormControl(moment());


  constructor(
    private financeService: FinanceService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {

    //Exibe lista com data igual a atual no formato 2022-12
    this.finance$ = this.financeService.list().pipe(
     map((item) => item.filter((item) => 
     item._date === moment().format('YYYY-MM')
     && item.tokenAuthenticatedUser === this.tokenAuthenticatedNow //exibir apenas o que foi criado pelo usuario
     )),
      catchError((error) => {
        this.onError('Erro ao carregar informações!');
        return of([]);
      })
    );
  }

  ngOnInit(): void {}

  //setar a data escolhida exibe na tela
  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    //Exibe lista com data conforme data escolhida no formato 2022-12
    this.finance$ = this.financeService.list().pipe(
      map((item) => item.filter((item) => 
      item._date === ctrlValue.format('YYYY-MM')
      && item.tokenAuthenticatedUser === this.tokenAuthenticatedNow //exibir apenas o que foi criado pelo usuario
      )),
      catchError((error) => {
        this.onError('Erro ao carregar informações!');
        return of([]);
      })
    );
    // //if(moment().isAfter(ctrlValue))
    // if(moment().isBefore(ctrlValue))
    // alert("Yep!");
  }

  //Refresh na tela para atualizar sem o item excluido
  refresh() {
    this.finance$ = this.financeService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar informações!');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  appetizer() {
    this.router.navigate(['appetizer'], { relativeTo: this.route });
  }

  exits() {
    this.router.navigate(['exits'], { relativeTo: this.route });
  }

  onEdit(finance: Model) {
    this.router.navigate(['edit', finance._id], { relativeTo: this.route });
  }

  onRemove(finance: Model) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este item?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.financeService.remove(finance._id).subscribe(
          () => {
            this.refresh();
            this.messagesService.header('Sucesso');
            this.messagesService.add('Item Removido com sucesso!');
          },
          () => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
  }

  //Realizar pesquisa por categoria
  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    //Utilizei o pipe e o filter pois queria exibir apenas a categoria
    this.finance$ = this.financeService
      .list()
      .pipe(
        map((item) =>
          item.filter((item) => item.category.toLowerCase().includes(value)
          && item.tokenAuthenticatedUser === this.tokenAuthenticatedNow //exibir apenas o que foi criado pelo usuario
          )
        )
      );
  }

  
}
