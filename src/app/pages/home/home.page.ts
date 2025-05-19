import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Home } from 'src/app/interfaces/Home.interface';
import { AuthService } from 'src/app/services/auth.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { GenericsService } from '../../services/generics.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
  standalone: false,
})
export class HomePage {
  constructor(
    private webSocket: WebSocketService,
    private router: Router,
    private authService: AuthService,
    private genericsService: GenericsService
  ) {}

  private listChat: Home[] = [];
  public filterChatsBk: Home[] = [];

  ionViewWillEnter(): void {
    this.connectedApp();
  }
  public connectedApp(): void {
    const idUser = this.authService.decodeToken().id;
    this.webSocket.connectWebSocket(idUser);
    this.getListChats();
  }
  public signOut(): void {
    this.webSocket.closeSesion();
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  public getListChats(): void {
    console.log('Obteniendo lista de chats');
    this.webSocket.getListChats().subscribe({
      next: (chats) => {
        console.log(chats);
        this.listChat = chats;
        this.filterChatsBk = [...this.listChat];
      },
      error: (error) => console.error(error),
    });
  }
  public getTime(createdAt: string): string {
    return this.genericsService.getTime(createdAt);
  }
  public filterChats(event: string) {
    if (!event) {
      this.filterChatsBk = [...this.listChat];
      return;
    }
    this.filterChatsBk = this.listChat.filter((chat) =>
      chat.chat.user.username.toLowerCase().includes(event.toLowerCase())
    );
  }
}
