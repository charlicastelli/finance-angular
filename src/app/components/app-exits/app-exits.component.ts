import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Model } from 'src/app/model/model';

import { FinanceService } from '../services/finance.service';
import * as _moment from 'moment';

import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-app-exits',
  templateUrl: './app-exits.component.html',
  styleUrls: ['./app-exits.component.scss'],
})
export class AppExitsComponent implements OnInit {
  finance$: Observable<Model[]>;

  
  readonly displayedColumns = ['credit', 'description', 'category'];

  constructor(
    private location: Location,
    private financeService: FinanceService
  ) {
    //Utilizei o pipe e o filter pois queria exibir apenas a categoria entrada
    this.finance$ = this.financeService
      .list()
      .pipe(map((item) => item.filter((item) => item.category != 'Pagamento' && item._date === moment().format('YYYY-MM'))));
  }

  ngOnInit(): void {}

  onCancel() {
    this.location.back();
  }
}
