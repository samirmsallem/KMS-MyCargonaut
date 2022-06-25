import { Component, OnInit } from '@angular/core';
import {ListingService} from "../service/listing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-offer',
  templateUrl: './driver-offer.component.html',
  styleUrls: ['./driver-offer.component.scss']
})
export class DriverOfferComponent implements OnInit {

  constructor(private listingService: ListingService, private _router: Router) {
    if(localStorage.getItem('authenticated') === null){
      this._router.navigate([''])
    }
  }

  ngOnInit(): void {
  }


  offerRide(email: string, bucher: string, kosten: number, sitzplaetze: number, frachtplatz: number, startort: string, ziel: string) {
    console.log(startort)
    this.listingService.addOffer(email, new Date(), bucher, kosten, sitzplaetze, frachtplatz, startort, ziel).then(() => {
      console.log("Successfully added offer")
    }).catch(() => {
      console.log("Error");
    })
  }

}
