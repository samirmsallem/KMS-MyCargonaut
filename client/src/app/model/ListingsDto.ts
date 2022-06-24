import {Listing} from "./Listing";

export class ListingsDto {
  listings: Listing[]

  constructor(listings: Listing[]) {
    this.listings = listings;
  }
}
