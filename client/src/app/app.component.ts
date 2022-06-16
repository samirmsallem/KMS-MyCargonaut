import { Component } from '@angular/core';
import {ListingService} from "./listing.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'client';

  constructor(private listingService: ListingService) {}


  loadOffers() {
    this.listingService
      .getOffers()
      .subscribe( (response) => {
        console.log(response);
      });
  }
}
