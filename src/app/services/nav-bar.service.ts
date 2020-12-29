import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private visible = false;
  constructor() { }

  isVisible() {
    return this.visible;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
