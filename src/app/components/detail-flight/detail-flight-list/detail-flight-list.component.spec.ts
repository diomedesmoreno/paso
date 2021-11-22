import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFlightListComponent } from './detail-flight-list.component';

describe('DetailFlightListComponent', () => {
  let component: DetailFlightListComponent;
  let fixture: ComponentFixture<DetailFlightListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFlightListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
