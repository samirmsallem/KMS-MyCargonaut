import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProfilComponent} from "./profil/profil.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CreationComponent} from "./creation/creation.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'offer', component: CreationComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
