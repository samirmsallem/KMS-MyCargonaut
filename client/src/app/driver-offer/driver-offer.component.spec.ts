import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverOfferComponent } from './driver-offer.component';

describe('DriverOfferComponent', () => {
  let component: DriverOfferComponent;
  let fixture: ComponentFixture<DriverOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverOfferComponent ]
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
