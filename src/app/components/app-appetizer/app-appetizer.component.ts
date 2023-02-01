import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { FinanceService } from '../services/finance.service';
import { Model } from './../../model/model';
import * as _moment from 'moment';

import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;


@Component({
  selector: 'app-app-appetizer',
  templateUrl: './app-appetizer.component.html',
  styleUrls: ['./app-appetizer.component.scss'],
})
export class AppAppetizerComponent implements OnInit {
  finance$: Observable<Model[]>;
  tokenAuthenticatedNow?: string = localStorage.getItem('token')?.toString();

  readonly displayedColumns = ['credit', 'description', 'category'];

  constructor(
    private location: Location,
    private financeService: FinanceService
  ) {
    //Utilizei o pipe e o filter pois queria exibir apenas a categoria entrada
    this.finance$ = this.financeService
      .list()
      .pipe(map((item) => item.filter((item) => 
      item.category === 'Pagamento' 
      && item._date === moment().format('YYYY-MM')
      && item.tokenAuthenticatedUser === this.tokenAuthenticatedNow //exibir apenas o que foi criado pelo usuario
      )));
  }

  ngOnInit(): void {}

  onCancel() {
    this.location.back();
  }
}
