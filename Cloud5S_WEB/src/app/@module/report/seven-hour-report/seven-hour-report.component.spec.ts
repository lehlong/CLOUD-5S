import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenHourReportComponent } from './seven-hour-report.component';

describe('SevenHourReportComponent', () => {
  let component: SevenHourReportComponent;
  let fixture: ComponentFixture<SevenHourReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SevenHourReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SevenHourReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
