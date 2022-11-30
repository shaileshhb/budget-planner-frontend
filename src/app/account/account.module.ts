import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './components/account/account.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
  ]
})
export class AccountModule { }
