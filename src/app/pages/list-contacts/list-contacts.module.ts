import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListContactsPageRoutingModule } from './list-contacts-routing.module';

import { ListContactsPage } from './list-contacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListContactsPageRoutingModule
  ],
  declarations: [ListContactsPage]
})
export class ListContactsPageModule {}
