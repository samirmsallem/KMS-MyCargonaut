/* eslint-disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};

class listingClass {
  email: string;
  zeit: Date;
  kosten: number;
  sitzplaetze: number;
  frachtplatz: number;
  startort: string;
  ziel: string;

  constructor(email: string, zeit: Date, kosten: number, sitzplaetze: number, frachtplatz: number,startort: string,ziel: string ) {
    this.email = email;
    this.zeit = zeit;
    this.kosten = kosten;
    this.sitzplaetze = sitzplaetze;
    this.frachtplatz = frachtplatz;
    this.startort = startort;
    this.ziel = ziel;

  }
}

@Injectable({
  providedIn: 'root'
})

export class ListingService {
  listingArray: any[] = [];
  //currentUser: any;

  private localhostURL: string = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  getAllListings() {
   return this.http.get(this.localhostURL + "/listings/getAllListings ",httpOptions)
     .toPromise()
     .then((res: any) => {
       for (let i = 0; i < res.listings.length; i++) {
         this.listingArray.push([res.listings[i].email, res.listings[i].zeit, res.listings[i].kosten, res.listings[i].sitzplaetze, res.listings[i].frachtplatz, res.listings[i].startort, res.listings[i].ziel])
       }
     }).catch((err: any) => {
       console.log('get listings failed' + err);
     })
  }

  async addOffer(email: string, zeit: Date, bucher: string, kosten: number, sitzplaetze: number, frachtplatz: number,startort: string,ziel: string) {
    return this.http.post(this.localhostURL + "/listings/createListing", {
      email: email,
      zeit: zeit,
      bucher: bucher,
      kosten: kosten,
      sitzplaetze: sitzplaetze,
      frachtplatz: frachtplatz,
      startort: startort,
      ziel: ziel,
    }, httpOptions)
  }

  async updateListing(email: string, zeit: Date, bucher: string, kosten: number, sitzplaetze: number, frachtplatz: number,startort: string,ziel: string) {
    return this.http.put(this.localhostURL + "/users/updateListing", {
      email: email,
      zeit: zeit,
      bucher: bucher,
      kosten: kosten,
      sitzplaetze: sitzplaetze,
      frachtplatz: frachtplatz,
      startort: startort,
      ziel: ziel
    }, httpOptions).toPromise()
      .then((res: any) => {
        console.log('listing was updated' + res);
      }).catch((err: any) => {
        console.log('listing update failed' + err);
      })
  }

  async deleteListing(id: string): Promise<void> {
    console.log("Deleting in progress... " + id)
    return this.http.post(this.localhostURL + "/users/deleteListing", {id}, httpOptions).toPromise()
      .then((res: any) => {
        this.listingArray = [];
        for (let i = 0; i < res.listing.length; i++) {
          this.listingArray.push(res.listings[i].email, res.listings[i].zeit, res.listings[i].kosten, res.listings[i].sitzplaetze, res.listings[i].frachtplatz, res.listings[i].startort, res.listings[i].ziel)
        }
      }).catch(() => {
        console.log('could not get listings ');
      })

  };

  // vehicles?
}
