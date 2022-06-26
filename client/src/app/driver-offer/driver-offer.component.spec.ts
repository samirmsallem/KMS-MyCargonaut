import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverOfferComponent } from './driver-offer.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

describe('DriverOfferComponent', () => {
  let component: DriverOfferComponent;
  let fixture: ComponentFixture<DriverOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverOfferComponent ],
      imports: [HttpClientTestingModule, NgbDatepickerModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
