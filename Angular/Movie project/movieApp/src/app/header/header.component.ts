import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  routePage = '';
  currentPage: string = '';
  constructor(private router: Router, private auth: AuthService) {}
  goToHome() {
    if (this.router.url == '/home') {
      console.log;
      this.router.navigate(['movie']);
    } else {
      this.router.navigate(['home']);
    }
  }
  logout() {
    this.auth.logout();
  }
  @Input() nextPage = {
    main: '',
    second: '',
  };
}
