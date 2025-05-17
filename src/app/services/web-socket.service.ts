import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { SendMessage } from '../interfaces/messages.interface';
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
}
