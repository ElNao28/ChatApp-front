import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContactsService } from '../services/contacts.service';
import { map } from 'rxjs';
import { User } from '../interfaces/Home.interface';

export const contactsResolver: ResolveFn<User[]> = (route, state) => {
  const contactService = inject(ContactsService);
  return contactService.getAllContacts().pipe(map((response) => response.data));
};
