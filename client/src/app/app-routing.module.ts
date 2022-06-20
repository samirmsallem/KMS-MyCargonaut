import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AppComponent} from "./app.component";
import {ProfilComponent} from "./components/profil/profil.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'profil', component: ProfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
