import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Chats, Message } from '../interfaces/chats.interface';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(private socket: Socket) {}

  public createRoom(idUser: string) {
    this.socket.emit('createRoom', { idUser });
  }
  public getChats(): Observable<Chats[]> {
    return this.socket.fromEvent('chatsRoom');
  }
  public connectRoom(chatId: string): void {
    this.socket.emit('connectRoom', { chatId });
  }
  public getMessagesByChat(): Observable<Message[]> {
    return this.socket.fromEvent('messagesRoom');
  }
}
