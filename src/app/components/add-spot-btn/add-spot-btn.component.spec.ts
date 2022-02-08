import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpotBtnComponent } from './add-spot-btn.component';

describe('AddSpotBtnComponent', () => {
  let component: AddSpotBtnComponent;
  let fixture: ComponentFixture<AddSpotBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpotBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpotBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
