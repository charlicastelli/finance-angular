import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Model } from 'src/app/model/model';


@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private readonly API = 'api/finance';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Model[]>(this.API).pipe(
      first(),
      // delay(1000),
      tap((finance) => console.log(finance))
    );
  }

  loadById(id: string) {
    return this.httpClient.get<Model>(`${this.API}/${id}`);
  }

  save(record: Partial<Model>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Model>) {
    return this.httpClient.post<Model>(this.API, record).pipe(first());
  }

  private update(record: Partial<Model>) {
    return this.httpClient
      .put<Model>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
