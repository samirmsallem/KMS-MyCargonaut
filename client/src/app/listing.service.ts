import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from 'rxjs';


@Injectable()
export class ListingService {

  constructor(private http: HttpClient) { }

  // Alle Angebote
  // getOffers() {
  //   this.http.get(' http://localhost:4200/offers');
  // }


  // Alle Angebote
  getOffers(): Observable<any>{
  return this.http.get(' http://localhost:4200/offers').pipe(
    map((result) => {return result;})
  );


}

  // private getError(error: Response): Observable<any>{
  //   console.log(error);
  //   return Observable.throw(error.json() || 'Server Issue');
  // }

  // todo spezifische Suche von Angeboten

  // Alle Gesuche
  getRequests() {
    this.http.get(' http://localhost:4200/requests');
  }

  // todo spezifische Suche von Gesuche


}
