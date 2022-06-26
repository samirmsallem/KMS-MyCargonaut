import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ListingService} from "../service/listing.service";
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ListingsDto} from "../model/ListingsDto";

@Component({
  selector: 'app-driver-offer',
  templateUrl: './driver-offer.component.html',
  styleUrls: ['./driver-offer.component.scss']
})
export class DriverOfferComponent implements OnInit {



  constructor(private listingService: ListingService, private calendar: NgbCalendar) {}

  created = false;
  incomplete = false;

  @ViewChild("from") from: ElementRef;
  @ViewChild("to") to: ElementRef;
  @ViewChild("spaces") spaces: ElementRef;
  @ViewChild("storage") storage: ElementRef;
  @ViewChild("vehicle") vehicle: ElementRef;
  @ViewChild("coins") coins: ElementRef;


  date: NgbDateStruct = this.calendar.getToday();

  ngOnInit(): void {
  }


  offerRide(kosten: number, sitzplaetze: number, frachtplatz: number, startort: string, ziel: string, zeit: string) {
    this.created = false;
    this.incomplete = false;

    if(kosten != null && sitzplaetze != null && frachtplatz != null && startort != "" && ziel != "" && zeit != ""){
      this.listingService.addOffer(new ListingsDto(startort, ziel, zeit, frachtplatz, sitzplaetze, kosten)).subscribe( res => {
        if(res){
          this.created = true;
          console.log("Successfully added offer")
          this.from.nativeElement.value = ""
          this.to.nativeElement.value = ""
          this.spaces.nativeElement.value = ""
          this.vehicle.nativeElement.value = ""
          this.coins.nativeElement.value = ""
        }
      })
    } else {
      this.incomplete = true
    }
  }

  dateToString() : string {
    return this.date.year+"-"+this.date.month+"-"+this.date.day
  }

}
