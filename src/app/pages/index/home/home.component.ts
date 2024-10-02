import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ChartData, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ NavigationComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    public doughnutChartData: ChartData<'doughnut'> = {
      labels: ['Rent', 'Groceries', 'Entertainment'],
      datasets: [
        {
          data: [500, 300, 200],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };
  
    public doughnutChartOptions: ChartOptions<'doughnut'> = {
      responsive: true,
      cutout: '50%', // Define o centro oco
      plugins: {
        legend: {
          position: 'top'
        }
      }
    };

}
