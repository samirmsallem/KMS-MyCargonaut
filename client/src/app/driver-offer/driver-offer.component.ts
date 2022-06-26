import { Component, OnInit } from '@angular/core';
import {ListingService} from "../service/listing.service";

@Component({
  selector: 'app-driver-offer',
  templateUrl: './driver-offer.component.html',
  styleUrls: ['./driver-offer.component.scss']
})
export class DriverOfferComponent implements OnInit {

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
  }


  offerRide(email: string, bucher: string, kosten: number, sitzplaetze: number, frachtplatz: number, startort: string, ziel: string) {
    console.log(startort)
    this.listingService.addOffer(email, new Date(), bucher, kosten, sitzplaetze, frachtplatz, startort, ziel).then( res => {
      console.log("Successfully added offer" + res)
    }).catch(() => {
      console.log("Error");
    })
  }

}
