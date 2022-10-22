import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: SignupComponent },
  {
    path: "envelop", loadChildren: () => import("./envelop/envelop.module").then(e => e.EnvelopModule)
  },
  { path: "", pathMatch: 'full', redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
