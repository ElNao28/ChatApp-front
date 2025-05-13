import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Message } from 'src/app/interfaces/chats.interface';
import { User } from 'src/app/interfaces/user.interface';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css'],
  standalone: false,
})
export class ChatPage implements OnInit {
  constructor(
    private activateRouter: ActivatedRoute,
    private webSocket: WebSocketService
  ) {}

  private jwtHelper = new JwtHelperService();
  public messages: Message[] = [];

  ngOnInit() {
    this.conectToRoom();
  }

  private conectToRoom(): void {
    if (this.getRoomId() !== 'new') {
      this.webSocket.connectRoom(this.getRoomId());
      this.getMessagesByRoom();
    }
  }

  private getMessagesByRoom(): void {
    this.webSocket.getMessagesByChat().subscribe({
      next: (messages) => {
        this.messages = messages;
        console.log(messages);
      },
      error: (error) => console.error(error),
    });
  }
  private decodeToken(): User {
    const token = localStorage.getItem('token');
    const decodedToken: User = this.jwtHelper.decodeToken(token!)!;
    return decodedToken;
  }
  private getRoomId(): string {
    return this.activateRouter.snapshot.paramMap.get('id')!;
  }
  public isMyMessage(message:Message):boolean{
    return message.user.id === this.decodeToken().id;
  }
}
