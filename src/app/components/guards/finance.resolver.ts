import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Model } from 'src/app/model/model';

import { FinanceService } from './../services/finance.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceResolver implements Resolve<Model> {

  constructor(
    private financeService: FinanceService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Model> {
    if (route.params && route.params['id']) {
      return this.financeService.loadById(route.params['id']);
    }
    return of({_id: '', credit: '', description: '', category: '', _date: ''});
  }
}
