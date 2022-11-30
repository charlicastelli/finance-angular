import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Model } from 'src/app/model/model';
import { ErrorDialogComponent } from 'src/app/shared/dialog/error-dialog/error-dialog.component';

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
    private financeService: FinanceService,
    public dialog: MatDialog
  ) {
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
