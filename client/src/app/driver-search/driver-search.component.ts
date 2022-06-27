import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ListingService} from "../service/listing.service";
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ListingsDto} from "../model/ListingsDto";


@Component({
  selector: 'app-driver-search',
  templateUrl: './driver-search.component.html',
  styleUrls: ['./driver-search.component.scss']
})
export class DriverSearchComponent implements OnInit {

  constructor(private listingService: ListingService, private calendar: NgbCalendar) {}

  created = false
  incomplete = false

  date: NgbDateStruct = this.calendar.getToday();


  @ViewChild("from") from: ElementRef = {} as ElementRef;
  @ViewChild("to") to: ElementRef = {} as ElementRef;
  @ViewChild("spaces") spaces: ElementRef = {} as ElementRef;
  @ViewChild("storage") storage: ElementRef = {} as ElementRef;
  @ViewChild("coins") coins: ElementRef = {} as ElementRef;

  ngOnInit(): void {
  }



  searchRide(kosten: number, sitzplaetze: number, frachtplatz: number, startort: string, ziel: string, zeit: string) {
    this.created = false;
    this.incomplete = false;

    if (kosten != null && sitzplaetze != null && frachtplatz != null && startort != "" && ziel != "" && zeit != "") {
      this.listingService.addRequest(new ListingsDto(startort, ziel, zeit, frachtplatz, sitzplaetze, kosten)).subscribe(res => {
        if (res) {
          this.created = true;
          console.log("Successfully added request")
          this.from.nativeElement.value = ""
          this.to.nativeElement.value = ""
          this.spaces.nativeElement.value = ""
          this.coins.nativeElement.value = ""
        }
      })
    } else {
      this.incomplete = true
    }



  }

  filterExistingOnes() {

  }

  dateToString() : string {
    return this.date.year+"-"+this.date.month+"-"+this.date.day
  }

}
