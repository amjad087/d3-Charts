import { MatKeyboardComponent, MatKeyboardConfig, MatKeyboardRef, MatKeyboardService } from 'angular-onscreen-material-keyboard';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavBarService } from './../services/nav-bar.service';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  @ViewChild('form', { static: true }) ngForm: NgForm;
  private _keyboardRef: MatKeyboardRef<MatKeyboardComponent>;
  @ViewChild('userRef', {read: ElementRef}) userElRef;
  @ViewChild('passRef', {read: ElementRef}) passElRef;

  constructor(
    private loginService: LoginService,
    private mtKeyBoardService: MatKeyboardService,
    private navService: NavBarService
    ) { }

  ngOnInit(): void {
    this.navService.hide();
    this.ngForm.form.valueChanges.subscribe(x => {
      console.log('ghghghg');
    })
  }

  ngAfterViewInit() {
    let congif = new MatKeyboardConfig();
    congif.darkTheme = true;
    this._keyboardRef = this.mtKeyBoardService.open('en', congif);
    this._keyboardRef.instance.setInputInstance(this.userElRef);

  }

  onUserNameFocus() {
    console.log("user name focus");

    this._keyboardRef.instance.setInputInstance(this.userElRef);
  }

  onPasswordFocus() {
    console.log("password focus");

    this._keyboardRef.instance.setInputInstance(this.passElRef);
  }


  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.onLogin();
    }
  }

  onLogin() {
    this.mtKeyBoardService.dismiss();
    this.loginService.onLogin();
  }

}
