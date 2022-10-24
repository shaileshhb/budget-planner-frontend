import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnvelopComponent } from './components/envelop/envelop.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: EnvelopComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvelopRoutingModule { }
