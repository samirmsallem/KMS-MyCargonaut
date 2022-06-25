import { Component, OnInit } from '@angular/core';
import {ListingService} from "../service/listing.service";


@Component({
  selector: 'app-driver-search',
  templateUrl: './driver-search.component.html',
  styleUrls: ['./driver-search.component.scss']
})
export class DriverSearchComponent implements OnInit {

  constructor(private listingService: ListingService) {}

  emailAnbieter = '';
  zeitAnbieter = new Date();
  kostenAnbieter = 0;
  sitzplaetzeAnbieter = 0;
  frachtplatzAnbieter = 0;

  startortAnbieter = '';
  zielAnbieter = '';
  bucherAnbieter = '';


  ngOnInit(): void {
  }



  searchRide(email: string,  time: string, sucher: string, kosten:number, sitzplaetze: number, frachtplatz: number, startort: string, ziel: string) {
    console.log(startort)
     this.listingService.addRequest(email, new Date(), sucher, kosten, sitzplaetze, frachtplatz, startort, ziel).then(() => {
       console.log("Successfully added request")
     }).catch(() => {
       console.log("Error");
     })
  }
}
