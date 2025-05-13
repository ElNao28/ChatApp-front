import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.css'],
  standalone: false,
})
export class ListUsersPage implements OnInit {
  constructor(private activateRouter: ActivatedRoute) {}
  private jwtHelper = new JwtHelperService();
  public users: User[] = [];
  ngOnInit() {
    this.activateRouter.data.subscribe(({ users }) => {
      this.users = users;
      const user = this.decodeToken();
      this.users = this.users.filter((u) => u.id !== user.id);
    });
  }
  private decodeToken(): User {
    const token = localStorage.getItem('token');
    const decodedToken: User = this.jwtHelper.decodeToken(token!)!;
    return decodedToken;
  }
}
