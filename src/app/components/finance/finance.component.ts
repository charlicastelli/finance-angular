import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Model } from 'src/app/model/model';
import { ErrorDialogComponent } from 'src/app/shared/dialog/error-dialog/error-dialog.component';

import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  
  finance$: Observable<Model[]>;

  constructor(
    private financeService: FinanceService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    
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

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  appetizer() {
    this.router.navigate(['appetizer'], { relativeTo: this.route });
  }

  exits() {
    this.router.navigate(['exits'], { relativeTo: this.route });
  }

}
