import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvelopRoutingModule } from './envelop-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnvelopService } from './service/envelop/envelop.service';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    EnvelopRoutingModule
  ],
  providers: [EnvelopService],
})
export class EnvelopModule { }
