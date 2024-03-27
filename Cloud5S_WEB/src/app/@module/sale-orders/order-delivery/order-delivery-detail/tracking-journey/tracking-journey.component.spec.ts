import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingJourneyComponent } from './tracking-journey.component';

describe('TrackingJourneyComponent', () => {
  let component: TrackingJourneyComponent;
  let fixture: ComponentFixture<TrackingJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingJourneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
