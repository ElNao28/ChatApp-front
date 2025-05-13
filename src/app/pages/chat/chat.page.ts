import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Message } from 'src/app/interfaces/chats.interface';
import { SendMessage } from 'src/app/interfaces/messages.interface';
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
    private webSocket: WebSocketService,
    private fb: FormBuilder
  ) {}

  private jwtHelper = new JwtHelperService();
  public messages: Message[] = [];
  public sendMessageForm = this.fb.group({
    message: ['', [Validators.required]],
  });
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
  public isMyMessage(message: Message): boolean {
    return message.user.id === this.decodeToken().id;
  }
  public ngClassByMessage(message: Message): string {
    if (!this.isMyMessage(message)) {
      return 'bg-gray-700 text-white';
    } else {
      return 'bg-white text-black';
    }
  }
  public sendMessage(): void {
    if (this.sendMessageForm.invalid) return;
    const data: SendMessage = {
      from: this.decodeToken().id,
      to: this.getReceptorId(),
      chatId: this.getRoomId(),
      message: this.sendMessageForm.controls['message'].value!,
    };
    this.webSocket.sendMessage(data);
    this.sendMessageForm.reset();
  }
  private getReceptorId(): string {
    const receptor = this.messages.find((message) => {
      return message.user.id !== this.decodeToken().id;
    });
    return receptor?.user.id!;
  }
  public getTime(createdAt: string) {
    const date = new Date(createdAt).toLocaleString();
    const timeSplit = date.split(', ')[1];
    const times = timeSplit.split(':');
    const schedule = times[2].split(' ')[1];
    return `${times[0]}:${times[1]} ${schedule}`;
  }
  public getNameChat(): string {
    const chat = this.messages.find((message) =>
      message.user.chats.find((chats) => chats.chat.id === this.getRoomId())
    );
    return chat?.user.chats.find((chat) => chat.chat.id === this.getRoomId())
      ?.title!;
  }
}
