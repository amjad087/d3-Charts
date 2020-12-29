import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn = false;

  constructor(private router: Router) { }

  onLogin() {
    this.isLoggedIn = true;
    this.router.navigate(['/home']);
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }
}
