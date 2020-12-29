import { NavBarService } from './../services/nav-bar.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatKeyboardComponent, MatKeyboardConfig, MatKeyboardRef, MatKeyboardService } from 'angular-onscreen-material-keyboard';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SetupComponent implements OnInit, AfterViewInit, OnDestroy {

  private _keyboardRef: MatKeyboardRef<MatKeyboardComponent>;
  @ViewChild('biochipProfileRef', {read: ElementRef}) biochipProfileElRef;
  @ViewChild('biochipNotesRef', {read: ElementRef}) biochipNotesElRef;
  @ViewChild('sampleProfileRef', {read: ElementRef}) sampleProfileElRef;
  @ViewChild('sampleNotesRef', {read: ElementRef}) sampleNotesElRef;
  constructor(private mtKeyBoardService: MatKeyboardService, private navService: NavBarService) { }

  ngOnInit(): void {
    this.navService.hide();
  }

  ngAfterViewInit() {
    let congif = new MatKeyboardConfig();
    congif.darkTheme = true;
    this._keyboardRef = this.mtKeyBoardService.open('en', congif);
    this._keyboardRef.instance.setInputInstance(this.biochipProfileElRef);
  }

  onBiochipProfileFocus() {
    this._keyboardRef.instance.setInputInstance(this.biochipProfileElRef);
  }

  onBiochipNotesFocus() {
    this._keyboardRef.instance.setInputInstance(this.biochipNotesElRef);
  }

  onSampleProfileFocus() {
    this._keyboardRef.instance.setInputInstance(this.sampleProfileElRef);
  }

  onSampleNotesFocus() {
    this._keyboardRef.instance.setInputInstance(this.sampleNotesElRef);
  }

  ngOnDestroy() {
    this.mtKeyBoardService.dismiss();
  }

}
