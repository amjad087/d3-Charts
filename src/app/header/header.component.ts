import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.loginService.isUserLoggedIn();
  }

}
