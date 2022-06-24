import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsSearchResultComponent } from './listings-search-result.component';

describe('ListingsSearchResultComponent', () => {
  let component: ListingsSearchResultComponent;
  let fixture: ComponentFixture<ListingsSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingsSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
