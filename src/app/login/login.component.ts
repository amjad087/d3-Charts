import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  @ViewChild('form', { static: true }) ngForm: NgForm;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.ngForm.form.valueChanges.subscribe(x => {
      console.log('ghghghg');
    })
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.onLogin();
    }
  }

  onLogin() {
    this.router.navigate(['/home']);
  }

}
