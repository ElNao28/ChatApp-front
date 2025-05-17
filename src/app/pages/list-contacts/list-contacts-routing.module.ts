import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListContactsPage } from './list-contacts.page';
import { contactsResolver } from 'src/app/resolvers/contacts.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListContactsPage,
    resolve: {
      contacts: contactsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListContactsPageRoutingModule {}
