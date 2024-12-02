import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ChartComponentApp } from '../chart/chart.component';
ChartComponentApp;

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ChartComponentApp,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  champions: any;
  labels: never[] = [];
  heading: any = 'CURRENT PULSE';
  winnerCount: number[] = [];
  allHistory: never[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getMovies();
  }
  getMovies() {
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

          console.log(this.labels + 'LABELD TE YHIS');
          this.udpatelabels();
          // Output the array of winners
        },
        error: (error) => {
          console.error('Error fetching movies:', error);
        },
      });
    //should be in public folder
    this.http.get('/champions.json').subscribe((movies) => {
      this.champions = movies;
    });
  }
  updateCount() {
    console.log(this.winnerCount);
  }
  udpatelabels() {
    this.data.labels = this.labels;
    console.log(this.winnerCount) + 'in';
    this.data.datasets[0].data = this.winnerCount;
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

  nextPage = {
    main: 'Home',
    second: 'Logout',
  };
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
        data: [9],
      },
    ],
  };
}
