import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { FinanceService } from '../services/finance.service';
import { Model } from './../../model/model';

@Component({
  selector: 'app-app-appetizer',
  templateUrl: './app-appetizer.component.html',
  styleUrls: ['./app-appetizer.component.scss'],
})
export class AppAppetizerComponent implements OnInit {
  finance$: Observable<Model[]>;

  readonly displayedColumns = ['credit', 'description', 'category'];

  constructor(
    private location: Location,
    private financeService: FinanceService
  ) {
    //Utilizei o pipe e o filter pois queria exibir apenas a categoria entrada
    this.finance$ = this.financeService
      .list()
      .pipe(map((item) => item.filter((item) => item.category === 'Entrada')));
  }

  ngOnInit(): void {}

  onCancel() {
    this.location.back();
  }
}
