import { NavBarService } from './../services/nav-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup-two',
  templateUrl: './setup-two.component.html',
  styleUrls: ['./setup-two.component.css']
})
export class SetupTwoComponent implements OnInit {

  constructor(private navService: NavBarService) { }

  ngOnInit(): void {
    this.navService.hide();
  }

}
