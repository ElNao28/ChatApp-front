import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SendMessage } from 'src/app/interfaces/messages.interface';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css'],
  standalone: false,
})
export class ChatPage {
  constructor(
    private activateRouter: ActivatedRoute,
    private webSocket: WebSocketService,
    private fb: FormBuilder
  ) {}
}
