import { Component, Input, OnInit } from '@angular/core';
import { Model } from 'src/app/model/model';

@Component({
  selector: 'app-info-finance',
  templateUrl: './info-finance.component.html',
  styleUrls: ['./info-finance.component.scss'],
})
export class InfoFinanceComponent implements OnInit {
  @Input() finance: Model[] = [];

  constructor() {}

  ngOnInit(): void {}

  getTotalAppetizer() {
    const totalValue = this.finance.filter((getTotal, index, array) => getTotal.category === 'Entrada');
    return totalValue.reduce((prev, elem) => prev + elem.credit, 0);
  }

  getTotalExits() {
    const totalValue = this.finance.filter((getTotal, index, array) => getTotal.category === 'Saída');
    return totalValue.reduce((prev, elem) => prev + elem.credit, 0);
  }

  getTotal() {
    const getTotal = (this.getTotalAppetizer() - this.getTotalExits());
    return getTotal;
  }
}
