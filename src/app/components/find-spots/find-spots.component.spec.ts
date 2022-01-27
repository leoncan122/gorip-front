import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSpotsComponent } from './find-spots.component';

describe('FindSpotsComponent', () => {
  let component: FindSpotsComponent;
  let fixture: ComponentFixture<FindSpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindSpotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
