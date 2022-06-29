/* eslint-disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Listing} from "../model/Listing";
import {ListingsDto} from "../model/ListingsDto";
import {catchError, throwError} from "rxjs";
import {Request} from "../model/Request";

const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};

// not in use
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
  listingArray: Listing[] = [];
  requestArray: Request[] = [];

  private localhostURL: string = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  public getAllListings(): Promise<Listing[]> {
    return new Promise<Listing[]>(resolve => {
      this.http.get<Listing[]>(this.localhostURL + "/listings/getAllListings ", httpOptions).subscribe(data => {
        let listings: Listing[] = []
        for(let listing of data){
          console.log(listing.ziel)
          listings.push(new Listing(listing._id, listing.ersteller, listing.bucher, listing.angenommen, listing.startort, listing.ziel, listing.zeit,  listing.kosten, listing.sitzplaetze, listing.frachtplatz, listing.commentar))
        }
        resolve(listings)
      })
    })
  }

  public claimAngebot(id: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.put<boolean>(this.localhostURL + "/listings/takeOffer",{
        _id: id,
      }, httpOptions).subscribe(data => {
        resolve(data)
      }
      )
    })
  }

  public claimRequest(id: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.put<boolean>(this.localhostURL + "/requests/takeRequest",{
        _id: id,
      }, httpOptions).subscribe(data => {
          resolve(data)
        }
      )
    })
  }

  addOffer(listing: ListingsDto) {
    return this.http.post<ListingsDto>(this.localhostURL + "/listings/createListing", listing, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  async updateListing(zeit: Date, bucher: string, kosten: number, sitzplaetze: number, frachtplatz: number,startort: string,ziel: string, commentar: string) {
    return this.http.put(this.localhostURL + "/users/updateListing", {
      zeit: zeit,
      bucher: bucher,
      kosten: kosten,
      sitzplaetze: sitzplaetze,
      frachtplatz: frachtplatz,
      startort: startort,
      ziel: ziel,
      commentar: commentar
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

  // requests
  addRequest(listing: ListingsDto) {
    return this.http.post<ListingsDto>(this.localhostURL + "/requests/createRequest", listing, httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public getAllRequests(): Promise<Request[]> {
    return new Promise<Request[]>(resolve => {
      this.http.get<Request[]>(this.localhostURL + "/requests/getAllRequests ", httpOptions).subscribe(data => {
        let requests: Request[] = []
        for(let request of data){
          requests.push(new Request(request._id, request.sucher, request.bucher, request.angenommen, request.startort, request.ziel, request.zeit,  request.kosten, request.sitzplaetze, request.frachtplatz, request.commentar))
        }
        resolve(requests)
      })
    })
  }
}
