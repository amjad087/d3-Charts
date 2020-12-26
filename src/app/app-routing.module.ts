import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { StatusComponent } from './status/status.component';
import { SetupFiveComponent } from './setup-five/setup-five.component';
import { SetupFourComponent } from './setup-four/setup-four.component';
import { SetupThreeComponent } from './setup-three/setup-three.component';
import { SetupTwoComponent } from './setup-two/setup-two.component';
import { SettingsComponent } from './settings/settings.component';
import { SetupComponent } from './setup/setup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: LockScreenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'setup-two', component: SetupTwoComponent },
  { path: 'setup-three', component: SetupThreeComponent },
  { path: 'setup-four', component: SetupFourComponent },
  { path: 'setup-five', component: SetupFiveComponent },
  { path: 'status', component: StatusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
