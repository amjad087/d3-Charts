import { NavBarService } from './../services/nav-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.css']
})
export class LockScreenComponent implements OnInit {

  constructor(private navService: NavBarService) { }

  ngOnInit(): void {
    this.navService.hide();
  }

}
