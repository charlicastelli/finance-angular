import { formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Model } from 'src/app/model/model';

import { FinanceService } from '../services/finance.service';
import * as _moment from 'moment';

import { default as _rollupMoment } from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-app-exits',
  templateUrl: './app-exits.component.html',
  styleUrls: ['./app-exits.component.scss'],
})
export class AppExitsComponent implements OnInit {
  finance$: Observable<Model[]>;
  tokenAuthenticatedNow?: string = localStorage.getItem('token')?.toString();

  readonly displayedColumns = ['credit', 'description', 'category'];

  constructor(
    private location: Location,
    private financeService: FinanceService
  ) {
    //Utilizei o pipe e o filter pois queria exibir apenas a categoria entrada
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

  onCancel() {
    this.location.back();
  }

  generatePdf() {
    let data = document.getElementById('table');

    let dateNow = Date.now(); //Data atual
    let formattedDate = formatDate(dateNow, 'dd-MM-yyyy HH:mm:ss', 'en-US'); //Formatar data

    html2canvas(data!).then((canvas) => {
      let imgWidth = 210;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let contentDataURL = canvas.toDataURL('image/png');
      let docPdf = new jsPDF('p', 'mm', 'a4');
      let position = 20;

      docPdf.text(
        this.loadName() + ', aqui estão suas despesas do mês',
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
