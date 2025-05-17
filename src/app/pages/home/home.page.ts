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

  public listChat: Home[] = [];

  ionViewWillEnter(): void {
    this.connectedApp();
    this.getListChats();
  }

  public connectedApp(): void {
    const idUser = this.authService.decodeToken().id;
    this.webSocket.connectWebSocket(idUser);
  }
  public signOut(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  public getListChats(): void {
    this.webSocket.getListChats().subscribe({
      next: (chats) => {
        this.listChat = chats;
      },
      error: (error) => console.error(error),
    });
  }
  public getTime(createdAt: string): string {
    return this.genericsService.getTime(createdAt);
  }
}
