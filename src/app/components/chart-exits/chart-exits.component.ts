import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ChartComponent,
} from 'ng-apexcharts';
import { Model } from 'src/app/model/model';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: any;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-chart-exits',
  templateUrl: './chart-exits.component.html',
  styleUrls: ['./chart-exits.component.scss'],
})
export class ChartExitsComponent implements OnInit {
  @Input() finance: Model[] = [];

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  constructor() {}

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

  getTotalEst() {
    const totalValue = this.finance.filter(
      (getTotal, index, array) => getTotal.category === 'Estudos'
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
      (getTotal, index, array) =>
        getTotal.category === 'Ferramentas e Acessórios'
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

  //Grafico formato pie exibe todas as categorias de despesas
  pieChart() {
    this.chartOptions = {
      series: [
        Number(this.getTotalAlim()),
        Number(this.getTotalAss()),
        Number(this.getTotalCuidados()),
        Number(this.getTotalEst()),
        Number(this.getTotalFerramentas()),
        Number(this.getTotalLanches()),
        Number(this.getTotalLazer()),
        Number(this.getTotalMoradia()),
        Number(this.getTotalSaude()),
        Number(this.getTotalTransporte()),
        Number(this.getTotalVest()),
        Number(this.getTotalOutros()),
      ],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
        },
      },
      colors: [
        '#4D80D4',
        '#836FFF',
        '#00BFFF',
        '#62D2A2',
        '#006400',
        '#91204d',
        '#B8860B',
        '#FF69B4',
        '#DC143C',
        '#FB1B0A',
        '#FFFF00',
        '#523961',
      ],
      chart: {
        width: 800,
        type: 'pie',
        foreColor: '#A7A7A7',
      },

      labels: [
        'Alimentação',
        'Assinaturas',
        'Cuidados Pessoais',
        'Estudos',
        'Ferramentas e Acessórios',
        'Lanches',
        'Lazer',
        'Moradia',
        'Saúde',
        'Transporte',
        'Vestuário',
        'Outros',
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 800,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
}
