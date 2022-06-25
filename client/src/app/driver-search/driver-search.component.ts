import { Component, OnInit } from '@angular/core';
import {ListingService} from "../service/listing.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-driver-search',
  templateUrl: './driver-search.component.html',
  styleUrls: ['./driver-search.component.scss']
})
export class DriverSearchComponent implements OnInit {

  constructor(private listingService: ListingService, private _router: Router) {
    if(localStorage.getItem('authenticated') === null){
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


  ngOnInit(): void {
  }



  searchRide(email: string,  time: string, bucher: string, kosten:number, sitzplaetze: string, frachtplatz: string, startort: string, ziel: string) {
    console.log(startort)
     this.listingService.addRequest(email, time, bucher, kosten, sitzplaetze, frachtplatz, startort, ziel).then(() => {
       console.log("Successfully added request")
     }).catch(() => {
       console.log("Error");
     })
  }
}
