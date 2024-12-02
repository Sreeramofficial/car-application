import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../header/header.component';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiconsumeService } from '../services/apiconsume.service';
import { ChartComponentApp } from '../chart/chart.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoginComponent,
    HeaderComponent,
    ChartjsComponent,
    CommonModule,
    HttpClientModule,
    ChartComponentApp,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  champions: any;
  winnerCount: number[] = [];
  labels: never[] = [];
  allHistory: never[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    // should be in public folder
    this.http
      .get<
        {
          year: number;
          Winner: never;
          Captain: string;
          ManoftheMatch: string;
          PlayeroftheTournament: string;
          image: string;
        }[]
      >('/champions.json')
      .subscribe({
        next: (movies) => {
          // Clear existing labels if necessary

          // Extract winners
          movies.forEach((movie) => {
            this.allHistory.push(movie.Winner);
            if (!this.labels.includes(movie.Winner)) {
              this.labels.push(movie.Winner);
            }
          });
          // Example: Basic for loop
          for (let i = 0; i < this.labels.length; i++) {
            this.winnerCount.push(
              this.countOccurrences(this.allHistory, this.labels[i])
            );
          }

          console.log(this.labels);
          this.udpatelabels();
          // Output the array of winners
        },
        error: (error) => {
          console.error('Error fetching movies:', error);
        },
      });
  }

  countOccurrences<T>(array: T[], element: T): number {
    let count = 0;
    for (const current of array) {
      if (current === element) {
        count++;
      }
    }
    return count;
  }

  udpatelabels() {
    this.data.labels = this.labels;
    this.data.datasets[0].data = this.winnerCount;
  }

  data = {
    labels: this.labels,
    datasets: [
      {
        backgroundColor: [
          '#8200ed',
          '#f2ff00',
          '#003c7d',
          '#00ccff',
          '#ff6f00',
          '#021c42',
          '#001aff',
        ],
        data: [5.4],
      },
    ],
  };
  heading: any = 'CURRENT PULSE';
  nextPage = {
    main: 'IPL ULSAV',
    second: 'Logout',
  };
}
