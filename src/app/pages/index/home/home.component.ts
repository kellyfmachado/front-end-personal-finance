import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ChartOptions, ChartData, LineElement } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { isPlatformBrowser, NgIf} from '@angular/common';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ NavigationComponent, BaseChartDirective, NgIf ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Category graph data
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Rent', 'Groceries', 'Entertainment'],
    datasets: [
      {
        data: [500, 300, 200, 100, 100, 50, 70],
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
        position: 'bottom',
        labels: {
          color: '#ffffff',
          font: {
            family: 'Arial',
            size: 20
          },
          pointStyle: 'circle',
          usePointStyle: true
        }
      }
    }
  };

  //Amount graph data
  public lineChartData: ChartData<'line'> = {
    labels: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],

    datasets: [
      {
        data: [500, 300, 200, 250, 230, 350, 150, 420],
        backgroundColor: ['#35a99b', '#f09a42', '#f38045'],
        hoverBackgroundColor: ['#62c7bb', '#eeb072', '#f3a178'],

      }
    ]
  };

  // Amount graph options
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };

}
