import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPracticeComponent } from './my-practice.component';

describe('MyPracticeComponent', () => {
  let component: MyPracticeComponent;
  let fixture: ComponentFixture<MyPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
