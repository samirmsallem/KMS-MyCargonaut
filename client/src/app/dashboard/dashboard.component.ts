import { Component, OnInit } from '@angular/core';
import {ListingService} from "../service/listing.service";
import {Listing} from "../model/Listing";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  coins: number = 0;

  constructor(private listingsService: ListingService, private _router: Router, private userService: UserService, public datepipe: DatePipe) {
    if(localStorage.getItem('authenticated') === null){
      this._router.navigate([''])
    } else {
      this.getAllListings()
      this.getCoins()
    }
  }

  ngOnInit(): void {
  }

  listingsArray: Listing[] = [];
  searchesArray: Listing[] = [];

  getAllListings() {
    this.listingsService.getAllListings().then(res => {
      this.listingsArray = res;
    })
  }

  takeAngebot(id :string) {
    this.listingsService.claimAngebot(id).then(res => {
      if (res) {
        console.log("Angebot erfolgreich angenommen")
        this.getAllListings()
        this.getCoins()
      }
    })
  }

  getUserInfo(id: string): any{

  }

  getCoins() {
    this.userService.getUserData().then(res => {
      this.coins = res.coins
    })
  }

  addCoins() {
    //call userservice to add 5000 coins or idk..
    this.getCoins()
  }


}
