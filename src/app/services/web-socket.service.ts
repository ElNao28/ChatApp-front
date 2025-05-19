import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message, SendMessage, User } from '../interfaces/messages.interface';
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
  public joinRoomByChatId(chatId: string): void {
    this.socket.emit('joinRoom', { chatId });
  }

  // public checkStatusUser(data: { userId: string }) {
  //   this.socket.emit('checkStatusUser', data);
  // }
  // public getStatusUser(): Observable<User> {
  //   return this.socket.fromEvent('statusUser');
  // }

  public sendMessage(data: SendMessage): void {
    this.socket.emit('sendMessage', data);
  }

  public getMessageByChatId(): Observable<Message> {
    return this.socket.fromEvent('newMessage');
  }

  public isWriting(data: {
    userId: string;
    chatId: string;
    isWriting: boolean;
  }) {
    this.socket.emit('isWriting', data);
  }
  public getWritingStatus(): Observable<{
    userId: string;
    isWriting: boolean;
  }> {
    return this.socket.fromEvent('writingStatus');
  }

  public closeSesion(): void {
    this.socket.disconnect();
  }
}
