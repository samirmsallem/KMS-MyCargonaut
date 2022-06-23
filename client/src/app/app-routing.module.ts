import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AppComponent} from "./app.component";
import {ProfilComponent} from "./components/profil/profil.component";
import {DriverSearchComponent} from "./components/driver-search/driver-search.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'dashboard', component: DriverSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
