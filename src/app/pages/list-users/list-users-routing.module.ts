import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListUsersPage } from './list-users.page';
import { contactsResolver } from 'src/app/resolvers/contacts.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListUsersPage,
    resolve:{
      users:contactsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListUsersPageRoutingModule {}
