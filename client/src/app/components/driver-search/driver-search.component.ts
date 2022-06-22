import { Component, OnInit } from '@angular/core';
import {ListingService} from "../../service/listing.service";

@Component({
  selector: 'app-driver-search',
  templateUrl: './driver-search.component.html',
  styleUrls: ['./driver-search.component.scss']
})
export class DriverSearchComponent implements OnInit {

  constructor(private listingService: ListingService) { }

  email = '';
  zeit = new Date(); // richtig
  kosten = 0;
  sitzplaetze = 0;
  frachtplatz = 0;

  startort = '';
  ziel = '';
  bucher = '';


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

  offerRide() {
     this.listingService.addOffer(this.email, this.zeit, this.bucher, this.kosten, this.sitzplaetze, this.frachtplatz, this.startort, this.ziel).then(() => {
       this.listingsArray = this.listingService.listingArray;
       console.log("Successfully added offer")
     }).catch(() => {
       console.log("Error");
     })
  }
}
