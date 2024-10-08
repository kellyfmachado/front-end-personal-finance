import { Component, Inject, PLATFORM_ID, HostListener} from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ChartOptions, ChartData, Chart, TooltipModel } from 'chart.js';
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

  @HostListener('mouseleave') onMouseLeave(event: MouseEvent) {
    const centerText = document.getElementById('donutCenterText');
    if (centerText) {
      centerText.innerText = ''; // Clears text on leave the graph
    }
  }

  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  perCent (context: { chart: Chart, tooltip: TooltipModel<'doughnut'> }) {
    const tooltipEl = document.getElementById('chartjs-tooltip');

    if (!tooltipEl) {
      const newTooltipEl = document.createElement('div');
      newTooltipEl.id = 'chartjs-tooltip';
      newTooltipEl.style.position = 'relative';
      newTooltipEl.style.backgroundColor = '#fff';
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

  perCentLeave () {
  }

  // Category graph data
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Rent', 'Groceries', 'Entertainment', 'Food', 'Travel', 'Donation'],
    datasets: [
      {
        data: [500, 300, 200, 100, 100, 50],
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
        // position: 'bottom',
        // align: 'center',
        // labels: {
        //   color: '#ffffff',
        //   font: {
        //     family: 'Arial',
        //     size: 20
        //   },
        //   pointStyle: 'circle',
        //   usePointStyle: true,
        //   padding: 20
        // }
        display: false
      },
      tooltip: {
        external: (context) => {

        }
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

  //Amount graph data
  public lineChartData: ChartData<'line'> = {
    labels: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'],

    datasets: [
      {
        data: [500, 300, 200, 250, 230, 350, 150, 420],
        backgroundColor: ['#35a99b', '#f09a42', '#f38045'],
        hoverBackgroundColor: ['#62c7bb', '#eeb072', '#f3a178']
      }
    ]
  };

  // Amount graph options
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

}
