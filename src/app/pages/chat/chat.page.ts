import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css'],
  standalone: false,
})
export class ChatPage implements OnInit {
  constructor(
    private activateRouter:ActivatedRoute
  ) {}

  private jwtHelper = new JwtHelperService();


  ngOnInit() {}

  private decodeToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken);
    } else {
      console.log('No token found');
    }
  }
  private getRoomId(): string {
    return this.activateRouter.snapshot.paramMap.get('id')!;
  }
}
