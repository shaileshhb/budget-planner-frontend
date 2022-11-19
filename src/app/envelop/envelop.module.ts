import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvelopRoutingModule } from './envelop-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnvelopService } from './service/envelop/envelop.service';
import { EnvelopComponent } from './components/envelop/envelop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    EnvelopComponent,
  ],
  imports: [
    CommonModule,
    EnvelopRoutingModule,
    NgbModule,
    SharedModule
  ],
  providers: [EnvelopService],
})
export class EnvelopModule { }
