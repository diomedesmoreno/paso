import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPlanesComponent } from './types-planes.component';

describe('TypesPlanesComponent', () => {
  let component: TypesPlanesComponent;
  let fixture: ComponentFixture<TypesPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesPlanesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
