import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Model } from 'src/app/model/model';


@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private readonly API = '/assets/list-test.json';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Model[]>(this.API)
    .pipe(
      first(),
      tap(finance => console.log(finance))
    );
  }
}
