import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNoFoundComponent } from './error-no-found.component';

describe('ErrorNoFoundComponent', () => {
  let component: ErrorNoFoundComponent;
  let fixture: ComponentFixture<ErrorNoFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorNoFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNoFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
