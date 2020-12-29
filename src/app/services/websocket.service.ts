import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

import { environment } from './../../environments/environment';
import { Message } from './../models/message';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  subject: WebSocketSubject<Message>;

  constructor() {
    this.subject = new WebSocketSubject(environment.wsServerUrl);
  }

  getServerMessageSubject() {
    return this.subject;
  }

  getChartsData(status: string, percent_complete: number, user: string) {
    const message:Message = {status, percent_complete, user};
    this.subject.next(message);
  }
}
