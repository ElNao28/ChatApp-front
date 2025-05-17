import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/Home.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.page.html',
  styleUrls: ['./list-contacts.page.css'],
  standalone: false,
})
export class ListContactsPage implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private activateRouter: ActivatedRoute,
    private authService: AuthService
  ) {}

  public users: User[] = [];

  ngOnInit() {
    this.getAllContacts();
  }

  private getAllContacts(): void {
    this.activateRouter.data.subscribe(({ contacts }) => {
      const idUser = this.authService.decodeToken().id;
      this.users = contacts;
      this.users = this.users.filter((user) => user.id !== idUser);
    });
  }
}
