import { Component, OnInit } from '@angular/core';
import {ListingService} from "../service/listing.service";
import {Listing} from "../model/Listing";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private listingsService: ListingService) {
    this.getAllListings()
  }

  ngOnInit(): void {
  }

  listingsArray: Listing[] = [];

  async getAllListings() {
    this.listingsArray = await this.listingsService.getAllListings()
    console.log(this.listingsArray + "got successful")
  }
}
