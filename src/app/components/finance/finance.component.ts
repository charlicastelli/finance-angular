import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Model } from 'src/app/model/model';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/dialog/error-dialog/error-dialog.component';

import { FinanceService } from '../services/finance.service';
import { MessagesService } from '../services/messages/messages.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class FinanceComponent implements OnInit {
  finance$: Observable<Model[]>;

  constructor(
    private financeService: FinanceService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {
    this.finance$ = this.financeService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar informações!');
        return of([]);
      })
    );
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

  ngOnInit(): void {}

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
}
