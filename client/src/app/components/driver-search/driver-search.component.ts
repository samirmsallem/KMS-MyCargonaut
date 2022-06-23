import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../service/listing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-search',
  templateUrl: './driver-search.component.html',
  styleUrls: ['./driver-search.component.scss']
})
export class DriverSearchComponent implements OnInit {

  constructor(private listingService: ListingService, private _router: Router) {
    if(localStorage.getItem('authenticated') == 'false'){
      this._router.navigate([''])
    }
}

  emailAnbieter = '';
  zeitAnbieter = new Date(); // richtig
  kostenAnbieter = 0;
  sitzplaetzeAnbieter = 0;
  frachtplatzAnbieter = 0;

  startortAnbieter = '';
  zielAnbieter = '';
  bucherAnbieter = '';



  listingsArray: any;

  ngOnInit(): void {
  }

   getAllListings() {
     this.listingService.getAllListings().then(() =>{
      this.listingsArray = this.listingService.listingArray;
      console.log("Successfully got listing")
    }).catch(() => {
      console.log("Error");
    })
  }

  offerRide(email: string, bucher: string, kosten: number, sitzplaetze: number, frachtplatz: number, startort: string, ziel: string) {
    console.log(startort)
     this.listingService.addOffer(email, new Date(), bucher, kosten, sitzplaetze, frachtplatz, startort, ziel).then(() => {
       this.listingsArray = this.listingService.listingArray;
       console.log("Successfully added offer")
     }).catch(() => {
       console.log("Error");
     })
  }
}
