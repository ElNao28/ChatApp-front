import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.css'],
  standalone: false,
})
export class ListUsersPage implements OnInit {
  constructor(private activateRouter: ActivatedRoute) {}
  public users: User[] = [];
  ngOnInit() {
    this.activateRouter.data.subscribe(({ users }) => (this.users = users));
  }
}
