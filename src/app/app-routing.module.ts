import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./components/login/login.component").then(l => l.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () => import("./components/signup/signup.component").then(s => s.SignupComponent),
  },
  // {
  //   path: "register",
  //   component: SignupComponent,
  // },
  {
    path: "envelop",
    loadChildren: () => import("./envelop/envelop.module").then(e => e.EnvelopModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
