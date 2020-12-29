import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SetupComponent } from './setup/setup.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { SetupTwoComponent } from './setup-two/setup-two.component';
import { SetupThreeComponent } from './setup-three/setup-three.component';
import { SetupFourComponent } from './setup-four/setup-four.component';
import { SetupFiveComponent } from './setup-five/setup-five.component';
import { StatusComponent } from './status/status.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { IKeyboardLayouts, keyboardLayouts, KeyboardClassKey, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from 'angular-onscreen-material-keyboard';
import { InProgressComponent } from './in-progress/in-progress.component';
import { CompleteComponent } from './complete/complete.component';

const customLayouts: IKeyboardLayouts = {
  ...keyboardLayouts,
  'Tölles Läyout': {
    'name': 'United Kingdom',
    'keys': [
      [
        ['q', 'Q'],
        ['w', 'W'],
        ['e', 'E', '\u00e9', '\u00c9'],
        ['r', 'R'],
        ['t', 'T'],
        ['y', 'Y'],
        ['u', 'U', '\u00fa', '\u00da'],
        ['i', 'I', '\u00ed', '\u00cd'],
        ['o', 'O', '\u00f3', '\u00d3'],
        ['p', 'P'],
        [KeyboardClassKey.Bksp, KeyboardClassKey.Bksp, KeyboardClassKey.Bksp, KeyboardClassKey.Bksp]
      ],
      [
        [KeyboardClassKey.Caps, KeyboardClassKey.Caps, KeyboardClassKey.Caps, KeyboardClassKey.Caps],
        ['a', 'A', '\u00e1', '\u00c1'],
        ['s', 'S'],
        ['d', 'D'],
        ['f', 'F'],
        ['g', 'G'],
        ['h', 'H'],
        ['j', 'J'],
        ['k', 'K'],
        ['l', 'L'],
        [KeyboardClassKey.Enter, KeyboardClassKey.Enter, KeyboardClassKey.Enter, KeyboardClassKey.Enter]
      ],
      [
        [KeyboardClassKey.Shift, KeyboardClassKey.Shift, KeyboardClassKey.Shift, KeyboardClassKey.Shift],
        ['z', 'Z'],
        ['x', 'X'],
        ['c', 'C'],
        ['v', 'V'],
        ['b', 'B'],
        ['n', 'N'],
        ['m', 'M'],
        [',', ','],
        ['.', '.'],
        [KeyboardClassKey.Shift, KeyboardClassKey.Shift, KeyboardClassKey.Shift, KeyboardClassKey.Shift]
      ],
      [
        ['.?123', '>'],
        [KeyboardClassKey.Space, KeyboardClassKey.Space, KeyboardClassKey.Space, KeyboardClassKey.Space],
        [KeyboardClassKey.Alt, KeyboardClassKey.Alt, KeyboardClassKey.AltGr, KeyboardClassKey.AltGr]

      ]
    ],
    'lang': ['en-GB']
  }
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SetupComponent,
    HeaderComponent,
    SettingsComponent,
    SetupTwoComponent,
    SetupThreeComponent,
    SetupFourComponent,
    SetupFiveComponent,
    StatusComponent,
    LockScreenComponent,
    InProgressComponent,
    CompleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatKeyboardModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FormsModule,
  ],
  providers: [
    { provide: MAT_KEYBOARD_LAYOUTS, useValue: customLayouts }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
