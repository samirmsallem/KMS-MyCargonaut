import { Component, OnInit } from '@angular/core';
import {ListingService} from "../service/listing.service";
import {Listing} from "../model/Listing";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {DatePipe} from "@angular/common";
import {Request} from '../model/Request'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  coins: number = 0;
  showCoinInput = false;
  newCoins: number = 0;
  applied = false;

  constructor(private listingsService: ListingService, private _router: Router, private userService: UserService, public datepipe: DatePipe) {
    if(localStorage.getItem('authenticated') === null){
      this._router.navigate([''])
    } else {
      this.getCoins()
      this.getAllListings()
      this.getAllRequests()
    }
  }

  ngOnInit(): void {
  }

  listingsArray: Listing[] = [];
  searchesArray: Request[] = [];


  getAllListings() {
    this.listingsService.getAllListings().then(res => {
      this.listingsArray = res;
    })
  }

  getAllRequests() {
    this.listingsService.getAllRequests().then(res => {
      this.searchesArray = res;
    })
  }

  takeAngebot(id :string) {
    this.listingsService.claimAngebot(id).then(res => {
      if (res) {
        this.getCoins()
        this.getAllListings()
        this.getAllRequests()
      }
    })
    window.location.reload();
  }

  takeRequest(id :string) {
    this.listingsService.claimRequest(id).then(res => {
      if (res) {
        this.getCoins()
        this.getAllListings()
        this.getAllRequests()
      }
    })
    window.location.reload();
  }

  getUserInfo(id: string): any{

  }

  getCoins() {
    this.userService.getUserData().then(res => {
      this.coins = res.coins
    })
  }

  toggleCoinInput() {
    this.showCoinInput = !this.showCoinInput;
  }
  addCoins() {
    this.userService.loadCoins(this.newCoins).then(res => {
        this.userService.getUserData().then(res => {
          this.coins = res.coins
          this.newCoins = 0;
          this.toggleCoinInput();
        })
    })
  }
}
