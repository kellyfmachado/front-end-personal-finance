import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ChartOptions, ChartData } from 'chart.js';
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

  // Dados do gráfico
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Rent', 'Groceries', 'Entertainment'],
    datasets: [
      {
        data: [500, 300, 200],
        backgroundColor: ['#35a99b', '#f09a42', '#f38045'],
        hoverBackgroundColor: ['#62c7bb', '#eeb072', '#f3a178']
      }
    ]
  };

  // Opções do gráfico
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '80%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {

        }
      }
    }
  };

}
