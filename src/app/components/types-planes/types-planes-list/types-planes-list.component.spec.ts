import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPlanesListComponent } from './types-planes-list.component';

describe('TypesPlanesListComponent', () => {
  let component: TypesPlanesListComponent;
  let fixture: ComponentFixture<TypesPlanesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesPlanesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesPlanesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
