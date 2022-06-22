import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './components/header/header.component';
import { DriverSearchComponent } from './components/driver-search/driver-search.component';

//import {ListingModule} from  '../'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfilComponent,
    HeaderComponent,
    DriverSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    //ListingModule
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
