import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatKeyboardComponent, MatKeyboardRef, MatKeyboardService, MatKeyboardConfig } from 'angular-onscreen-material-keyboard';

import { NavBarService } from './../services/nav-bar.service';

@Component({
  selector: 'app-setup-five',
  templateUrl: './setup-five.component.html',
  styleUrls: ['./setup-five.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SetupFiveComponent implements OnInit, AfterViewInit, OnDestroy {

  private _keyboardRef: MatKeyboardRef<MatKeyboardComponent>;
  @ViewChild('currLocRef', {read: ElementRef}) currLocElRef;
  @ViewChild('addLocRef', {read: ElementRef}) addLocElRef;

  constructor(private navService: NavBarService, private mtKeyBoardService: MatKeyboardService) { }

  ngOnInit(): void {
    this.navService.hide();
  }

  ngAfterViewInit() {
    let congif = new MatKeyboardConfig();
    congif.darkTheme = true;
    this._keyboardRef = this.mtKeyBoardService.open('en', congif);
    this._keyboardRef.instance.setInputInstance(this.currLocElRef);
  }

  onCurrLocFocus() {
    this._keyboardRef.instance.setInputInstance(this.currLocElRef);
  }

  onAddLocFocus() {

    this._keyboardRef.instance.setInputInstance(this.addLocElRef);
  }


  ngOnDestroy() {
    this.mtKeyBoardService.dismiss();
  }

}
