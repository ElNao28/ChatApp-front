import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Chats } from 'src/app/interfaces/chats.interface';
import { User } from 'src/app/interfaces/user.interface';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
  standalone: false,
})
export class HomePage implements OnInit {
  constructor(
    private webSocket: WebSocketService,
  ) {}
  private jwtService = new JwtHelperService();
  private token: string = '';
  public titleUser: string = '';
  public chats: Chats[] = [];
  ngOnInit(): void {
    this.decodeToken();
  }
  private decodeToken(): void {
    this.token = localStorage.getItem('token')!;
    const tokenDecoded: User = this.jwtService.decodeToken(this.token)!;
    this.connectWebSocket(tokenDecoded.id);
    this.titleUser = tokenDecoded.username;
  }
  private connectWebSocket(idUser: string): void {
    this.webSocket.createRoom(idUser);
    this.webSocket.getChats().subscribe({
      next: (chats) => {
        this.chats = chats;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
