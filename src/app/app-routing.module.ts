import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./components/login/login.component").then(l => l.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () => import("./components/signup/signup.component").then(s => s.SignupComponent),
  },
  {
    path: "account",
    loadChildren: () => import('./account/account.module').then(a => a.AccountModule),
  },
  // {
  //   path: "account",
  //   loadComponent: () => import("./components/user-account/user-account.component").then(a => a.UserAccountComponent),
  // },
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
