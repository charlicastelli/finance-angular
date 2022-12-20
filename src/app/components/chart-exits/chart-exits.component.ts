import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';
import { Model } from 'src/app/model/model';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-chart-exits',
  templateUrl: './chart-exits.component.html',
  styleUrls: ['./chart-exits.component.scss']
})
export class ChartExitsComponent implements OnInit {
  @Input() finance: Model[] = [];

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor() { }

  ngOnInit(): void {
    this.pieChart();
  }

  getTotalMoradia() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Moradia'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotalTransporte() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Transporte'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotalLazer() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Lazer'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotalAlim() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Alimentação'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotalSaude() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Saúde'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotalVest() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Vestuário'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotalAss() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Assinaturas'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotalCuidados() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Cuidados Pessoais'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotalFerramentas() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Ferramentas e Acessórios'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotalLanches() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Lanches'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }

  getTotalOutros() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Outros'
    );
    return totalValue.reduce((prev, elem) => parseFloat(prev + elem.credit), 0);
  }


  pieChart() {
    
    this.chartOptions = {
      series: [
        Number(this.getTotalMoradia()), 
        Number(this.getTotalTransporte()), 
        Number(this.getTotalLazer()),
        Number(this.getTotalAlim()),
        Number(this.getTotalSaude()),
        Number(this.getTotalVest()),
        Number(this.getTotalAss()),
        Number(this.getTotalCuidados()),
        Number(this.getTotalFerramentas()),
        Number(this.getTotalLanches()),
        Number(this.getTotalOutros())
      ],
      chart: {
        width: 800,
        type: "pie"
      },
      labels: [
        "Moradia",
        "Transporte", 
        "Lazer", 
        "Alimentação",
        "Saúde",
        "Vestuário",
        "Assinaturas",
        "Cuidados Pessoais",
        "Ferramentas e Acessórios",
        "Lanches",
        "Outros",
        
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
