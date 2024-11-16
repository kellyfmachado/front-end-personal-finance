import { Component, Inject, PLATFORM_ID, HostListener, ChangeDetectorRef} from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ChartOptions, ChartData, Chart, TooltipModel } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { isPlatformBrowser, NgFor, NgIf} from '@angular/common';
import { CategoryService } from '../../../services/category/category.service';
import { CategoryModel } from '../../../models/category.model';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { TransactionModel } from '../../../models/transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ NavigationComponent, BaseChartDirective, NgIf, CommonModule, NgFor ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private categoryService: CategoryService, private transactionService: TransactionService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public isAliveLastTransaction: boolean = false;
  public isAliveLastDay: boolean = true;

  public transactionTypes: string[] = ['deposit', 'withdraw'];
  public now: Date = new Date();
  public hours: number = this.now.getHours();
  public minutes: number = this.now.getMinutes();
  public categories: CategoryModel[] = [];
  public transactions: TransactionModel[] = [];
  public lastTransaction: TransactionModel | null = null;
  public availableAmount: number = 0;
  public graphTime: Date = new Date();
  public onLastDay: boolean = true;
  public firstTime: boolean = true;

  ngOnInit() {
    this.getCategories();
    this.getTransactions();
    this.graphTime.setHours(this.graphTime.getHours() - 24);
  }

  transactionsLastDay(event: MouseEvent){
    this.graphTime.setHours(this.graphTime.getHours() - 24);
    this.onLastDay = true;
    this.getTransactions();
  }

  transactionsLastWeek(event: MouseEvent){
    this.graphTime.setDate(this.graphTime.getDate() - 7);
    this.onLastDay = false;
    this.getTransactions();
  }

  capitalizeWords(str: string) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  getCategories() {
    this.categoryService.list().subscribe({
      next: (response)  => {
        this.categories = response.content.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);;
        this.doughnutChartData.labels = this.categories.map(category => category.name);
        this.doughnutChartData.datasets[0].data = this.categories.map(category => category.amount);
        this.availableAmount = this.categories.reduce((total, category) => total + category.amount, 0);
      },
      error: (err) => console.log('Error getting categories', err)
    });
  }

  getTransactions() {
    this.transactionService.list().subscribe({
      next: (response)  => {
        this.transactions = response.content.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
        this.transactions = this.transactions.filter(transaction => transaction.date >= this.graphTime);
        this.graphTime = new Date();

        if(this.onLastDay){
          this.isAliveLastDay = true;
        }
        else {
          this.isAliveLastDay = false;
        }
        
        this.barChartDataLastDay.labels = this.transactions.map(transaction => 
          new Date(transaction.date).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        }));

        this.barChartDataLastWeek.labels = this.transactions.map(transaction => 
          new Date(transaction.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit'
          })
        );          

        this.barChartDataLastDay.datasets[0].data = this.transactions.map(transaction => transaction.amount);
        this.barChartDataLastDay.datasets[0].backgroundColor = this.transactions.map(transaction => this.typeColors[transaction.type]);
        this.barChartDataLastDay.datasets[0].hoverBackgroundColor = this.transactions.map(transaction => this.hoverTypeColors[transaction.type]);

        this.barChartDataLastWeek.datasets[0].data = this.transactions.map(transaction => transaction.amount);
        this.barChartDataLastWeek.datasets[0].backgroundColor = this.transactions.map(transaction => this.typeColors[transaction.type]);
        this.barChartDataLastWeek.datasets[0].hoverBackgroundColor = this.transactions.map(transaction => this.hoverTypeColors[transaction.type]);

        if (this.firstTime){
          this.lastTransaction = this.transactions[this.transactions.length-1];
          this.lastTransaction.type = this.capitalizeWords(this.lastTransaction.type);
          this.lastTransaction.categoryModel.name = this.capitalizeWords(this.lastTransaction.categoryModel.name);
          this.firstTime = false; 
        }
        
        if(this.transactions.length!=0){
          this.isAliveLastTransaction = true;
        }
        else {
          this.isAliveLastTransaction = false;
        }

      },
      error: (err) => console.log('Error getting transactions', err)
    });
  }

  @HostListener('mouseleave') perCentLeave(event: MouseEvent) {
    const centerText = document.getElementById('donutCenterText');
    if (centerText) {
      centerText.innerText = ''; // Clears text on leave the graph
    }
  }

  perCent (context: { chart: Chart, tooltip: TooltipModel<'doughnut'> }) {
    const tooltipEl = document.getElementById('chartjs-tooltip');

    if (!tooltipEl) {
      const newTooltipEl = document.createElement('div');
      newTooltipEl.id = 'chartjs-tooltip';
      newTooltipEl.style.position = 'relative';
      newTooltipEl.style.backgroundColor = '#ffffff';
      newTooltipEl.style.padding = '10px';
      document.body.appendChild(newTooltipEl);
    }

    if (!tooltipEl){
      return;
    }

    if (context.tooltip.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }

    tooltipEl.innerHTML = `<div>${context.tooltip.body.map(item => item.lines).join('<br>')}</div>`;
    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = context.chart.canvas.offsetLeft + context.tooltip.caretX + 'px';
    tooltipEl.style.top = context.chart.canvas.offsetTop + context.tooltip.caretY + 'px';

  }

  // Category graph data
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#35a99b', '#f09a42', '#f38045'],
        hoverBackgroundColor: ['#62c7bb', '#eeb072', '#f3a178']
      }
    ]
  };

  // Category graph options
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      }
    },
    layout: {
      padding: 25
    },
    onHover: (event, chartElement) => {
      const centerText = document.getElementById('donutCenterText');
      if (chartElement.length && centerText) {
        const elementIndex = chartElement[0].index;
        const dataset = this.doughnutChartData.datasets[0];
        const value = dataset.data[elementIndex] as number;
        const total = (dataset.data as number[]).reduce((acc, val) => acc + val, 0);
        const percentage = ((value / total) * 100).toFixed(1) + '%';
        centerText.innerText = percentage;
      } else if (centerText) {
        centerText.innerText = ''; // Clears text on leave a graph's piece
      }
    }
  };

  // Mapping colors by types
  public typeColors: { [key: string]: string } = {
    deposit: '#35a99b',
    withdraw: '#f38045',
  };

  private hoverTypeColors: { [key: string]: string } = {
    deposit: '#62c7bb',
    withdraw: '#f3a178',
  };

  // Amount graph data
  public barChartDataLastDay: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
        barPercentage: 0.5,
        categoryPercentage: 0.9
      }
    ]
  };

  public barChartDataLastWeek: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
        barPercentage: 0.5,
        categoryPercentage: 0.9
      }
    ]
  };

  // Amount graph options
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: false,
    aspectRatio: 3,
    plugins: {
      legend: {
        display: false
      }
    },
    layout: {
      padding: {
        top: 0,
        left: 25,
        right: 25,
        bottom: 15
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100
        }
      },
      x: {
        stacked: false,
        grid: {
          display: false
        }

      }
    }
  };

}
