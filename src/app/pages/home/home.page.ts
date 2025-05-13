import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
  standalone: false,
})
export class HomePage implements OnInit {
  constructor() {}
  private jwtService = new JwtHelperService();
  private token: string = '';
  public titleUser: string = '';
  ngOnInit(): void {
    this.decodeToken();
  }
  private decodeToken(): void {
    this.token = localStorage.getItem('token')!;
    const tokenDecoded: User = this.jwtService.decodeToken(this.token)!;
    this.titleUser = tokenDecoded.username;
  }
}
