import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Model } from 'src/app/model/model';

import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  finance$: Observable<Model[]>;
  displayedColumns = ['credit', 'description', 'category', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private financeService: FinanceService
  ) {
    this.finance$ = this.financeService.list();
   }

  ngOnInit(): void {
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  appetizer() {
    this.router.navigate(['appetizer'], { relativeTo: this.route });
  }

  exits() {
    this.router.navigate(['exits'], { relativeTo: this.route });
  }


}
