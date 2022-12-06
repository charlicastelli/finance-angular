import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  message: string = '';
  msgHeader: string = '';

  constructor() {}

  header(msgHeader: string) {
    this.msgHeader = msgHeader;
  }

  add(message: string) {
    this.message = message;

    //tempo de exibição
    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  clear() {
    this.message = '';
    this.msgHeader = '';
  }
}
