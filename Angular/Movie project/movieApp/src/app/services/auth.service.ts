import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private route: Router) {}

  login(userName: string, password: string) {
    console.log('lg called');
    if (userName == 'S' && password == 'S') {
      return 200;
    } else {
      return 403;
    }
  }
  logout() {
    this.route.navigate(['login']);
  }
}
