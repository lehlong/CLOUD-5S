import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidnightReportComponent } from './midnight-report.component';

describe('MidnightReportComponent', () => {
  let component: MidnightReportComponent;
  let fixture: ComponentFixture<MidnightReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidnightReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MidnightReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
