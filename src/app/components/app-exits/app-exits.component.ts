import { formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Model } from 'src/app/model/model';

import { FinanceService } from '../services/finance.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



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
import { FormControl } from '@angular/forms';
import { ErrorDialogComponent } from 'src/app/shared/dialog/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  selector: 'app-app-exits',
  templateUrl: './app-exits.component.html',
  styleUrls: ['./app-exits.component.scss'],
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
export class AppExitsComponent implements OnInit {
  finance$: Observable<Model[]>;
  tokenAuthenticatedNow?: string = localStorage.getItem('token')?.toString();

  readonly displayedColumns = ['credit', 'description', 'category'];

  //Paga a data atual
  date = new FormControl(moment().locale('pt')); //moment().locale('pt) formato Brasileiro
  ctrlValue = this.date.value!;

  constructor(
    private location: Location,
    private financeService: FinanceService,
    public dialog: MatDialog,
  ) {
    //Utilizei o pipe e o filter pois queria exibir apenas a categoria saída
    this.finance$ = this.financeService.list().pipe(
      map((item) =>
        item.filter(
          (item) =>
            item.category != 'Pagamento' &&
            item._date === moment().format('YYYY-MM') &&
            item.tokenAuthenticatedUser === this.tokenAuthenticatedNow //exibir apenas o que foi criado pelo usuario
        )
      )
    );
  }

  ngOnInit(): void {}

  //setar a data escolhida exibe na tela
  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    
    this.ctrlValue.month(normalizedMonthAndYear.month());
    this.ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(this.ctrlValue);
    datepicker.close();

    //Exibe lista com data conforme data escolhida no formato 2023-12
    this.finance$ = this.financeService.list().pipe(
      map((item) => item.filter((item) => 
      item._date === this.ctrlValue.format('YYYY-MM') //Data deve ser nesse formato, pois é o mesmo utilizado no banco de dados
      && item.tokenAuthenticatedUser === this.tokenAuthenticatedNow //exibir apenas o que foi criado pelo usuario
      )),
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

  
  onCancel() {
    this.location.back();
  }

  generatePdf() {
    let data = document.getElementById('table');
    let selectedDate = this.ctrlValue.format('MMMM/YYYY');

    let dateNow = Date.now(); //Data atual
    let formattedDate = formatDate(dateNow, 'dd-MM-yyyy HH:mm:ss', 'en-US'); //Formatar data

    html2canvas(data!).then((canvas) => {
      let imgWidth = 210;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let contentDataURL = canvas.toDataURL('image/png');
      let docPdf = new jsPDF('p', 'mm', 'a4');
      let position = 20;

      docPdf.text(
        this.loadName() + ', aqui estão suas despesas de ' + selectedDate,
        105,
        10,
        { align: 'center' }
      );

      docPdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      docPdf.save(formattedDate + '.pdf');
    });

    // doc.output('dataurlnewwindow'); //abre em uma nova janela
  }

  loadName() {
    let nameLocalStorage = localStorage.getItem('name');
    let firstName = nameLocalStorage?.split(' ');
    return firstName![0];
  }
}
