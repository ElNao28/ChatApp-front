import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message, SendMessage } from '../interfaces/messages.interface';
import { Home } from '../interfaces/Home.interface';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(private socket: Socket) {}

  public connectWebSocket(userId: string): void {
    this.socket.emit('enterApp', { userId });
  }

  public getListChats(): Observable<Home[]> {
    return this.socket.fromEvent('listChats');
  }

  public closeSesion(): void {
    this.socket.disconnect();
  }
  public joinRoomByChatId(chatId: string): void {
    this.socket.emit('joinRoom', { chatId });
  }
  public sendMessage(data: SendMessage): void {
    this.socket.emit('sendMessage', data);
  }
  public getMessageByChatId(): Observable<Message> {
    return this.socket.fromEvent('newMessage');
  }
}
