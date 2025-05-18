import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap } from 'rxjs';
import {
  ChatUser,
  Message,
  SendMessage,
} from 'src/app/interfaces/messages.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { GenericsService } from 'src/app/services/generics.service';
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
    private chatService: ChatService,
    private authService: AuthService,
    private genericsService: GenericsService,
    private webSocket: WebSocketService,
    private fb: FormBuilder
  ) {}

  public messages: Message[] = [];
  private foundChat: boolean = false;
  private idChat: string | undefined = undefined;
  public titleChat: string = '';
  public sendMessageForm: FormGroup = this.fb.group({
    message: ['', [Validators.required]],
  });

  ionViewWillEnter(): void {
    this.getChats();
  }

  private getChats(): void {
    const from = this.authService.decodeToken().id;
    const to = this.activateRouter.snapshot.paramMap.get('id')!;
    this.chatService
      .getMessagesByUsers({ from, to })
      .pipe(
        map((resp) => {
          const { statusCode, data } = resp;
          if (resp.statusCode === 404) {
            this.foundChat = false;
            return {
              statusCode,
              data: { messages: [] },
              message: 'No messages found',
            };
          }
          this.foundChat = true;
          this.idChat = data.id;
          this.jointRoomByChat(data.id);
          this.getMessage();
          return resp;
        }),
        map((res) => res.data)
      )
      .subscribe({
        next: (chatUser) => {
          this.messages = chatUser.messages;
        },
        error: (err) => console.error(err),
      });
  }

  private jointRoomByChat(idChat: string): void {
    this.webSocket.joinRoomByChatId(idChat);
  }

  public sendMessage(): void {
    const dataSend: SendMessage = {
      from: this.authService.decodeToken().id,
      to: this.activateRouter.snapshot.paramMap.get('id')!,
      message: this.sendMessageForm.controls['message'].value,
      chatId: this.idChat,
    };
    this.webSocket.sendMessage(dataSend);
    if (!this.foundChat) {
      this.getChats();
    }
    this.sendMessageForm.reset();
  }

  private getMessage(): void {
    this.webSocket.getMessageByChatId().subscribe({
      next: (message: Message) => {
        this.messages.push(message);
        console.log('Evento nuevo mensaje')
      },
      error: (err) => console.error(err),
    });
  }

  public getTime(createdAt: string): string {
    return this.genericsService.getTime(createdAt);
  }
  public isMyMessage(message: Message): boolean {
    return message.user.id === this.authService.decodeToken().id;
  }
  public ngClassByMessage(message: Message): string {
    if (!this.isMyMessage(message)) {
      return 'bg-gray-700 text-white';
    } else {
      return 'bg-white text-black';
    }
  }
}
