import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { DriverSearchComponent } from './driver-search/driver-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreationComponent } from './creation/creation.component';
import { DriverOfferComponent } from './driver-offer/driver-offer.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";
import {ListingService} from './service/listing.service'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfilComponent,
    HeaderComponent,
    DriverSearchComponent,
    DashboardComponent,
    CreationComponent,
    DriverOfferComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [LoginComponent, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
