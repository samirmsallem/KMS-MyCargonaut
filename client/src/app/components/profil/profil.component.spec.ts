import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilComponent } from './profil.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilComponent ], imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
