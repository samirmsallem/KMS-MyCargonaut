import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSearchComponent } from './driver-search.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

describe('DriverSearchComponent', () => {
  let component: DriverSearchComponent;
  let fixture: ComponentFixture<DriverSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverSearchComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, NgbDatepickerModule]
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
