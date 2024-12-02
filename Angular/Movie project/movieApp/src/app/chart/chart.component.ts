import { Component, Input, input } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ChartComponent } from 'chart.js';
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartjsComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponentApp {
  @Input() data: any = {
    labels: [],
    datasets: [
      {
        backgroundColor: [],
        data: [],
      },
    ],
  };
  @Input() heading: any;
  @Input() explanation: any = {
    bestTeam: 'csk',
    totalCup: 5,
    captain: '',
  };
}
