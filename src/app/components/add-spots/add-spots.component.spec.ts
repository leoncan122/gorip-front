import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpotsComponent } from './add-spots.component';

describe('AddSpotsComponent', () => {
  let component: AddSpotsComponent;
  let fixture: ComponentFixture<AddSpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSpotsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
