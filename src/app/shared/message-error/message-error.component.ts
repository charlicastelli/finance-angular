import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../components/services/messages/messages.service';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.scss']
})
export class MessageErrorComponent implements OnInit {

  constructor(public messagesService: MessagesService) { }

  ngOnInit(): void {
  }

}
