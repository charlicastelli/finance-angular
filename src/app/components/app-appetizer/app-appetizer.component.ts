import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { FinanceService } from '../services/finance.service';
import { Model } from './../../model/model';

@Component({
  selector: 'app-app-appetizer',
  templateUrl: './app-appetizer.component.html',
  styleUrls: ['./app-appetizer.component.scss']
})
export class AppAppetizerComponent implements OnInit {
  finance$: Observable<Model[]>;


  readonly displayedColumns = ['credit', 'description', 'category'];

  constructor(
    private location: Location,
    private financeService: FinanceService,
  ) { 
    this.finance$ = this.financeService.list();
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.location.back();
  }

}
