import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSearchComponent } from './driver-search.component';
import {HttpClientModule} from "@angular/common/http";

describe('DriverSearchComponent', () => {
  let component: DriverSearchComponent;
  let fixture: ComponentFixture<DriverSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverSearchComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
