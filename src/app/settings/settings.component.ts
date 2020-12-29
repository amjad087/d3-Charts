import { NavBarService } from './../services/nav-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private navService: NavBarService) { }

  ngOnInit(): void {
    this.navService.show();
  }

}
