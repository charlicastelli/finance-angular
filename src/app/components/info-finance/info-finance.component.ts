import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from 'src/app/model/model';

@Component({
  selector: 'app-info-finance',
  templateUrl: './info-finance.component.html',
  styleUrls: ['./info-finance.component.scss'],
})
export class InfoFinanceComponent implements OnInit {
  @Input() finance: Model[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  getTotalAppetizer() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Pagamento'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotalExits() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category != 'Pagamento'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotal() {
    const getTotal = this.getTotalAppetizer() - this.getTotalExits();
    return getTotal;
  }

  appetizer() {
    this.router.navigate(['appetizer'], { relativeTo: this.route });
  }

  exits() {
    this.router.navigate(['exits'], { relativeTo: this.route });
  }
}
