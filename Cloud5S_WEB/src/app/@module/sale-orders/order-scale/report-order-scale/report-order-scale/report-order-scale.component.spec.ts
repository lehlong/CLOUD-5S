import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderScaleComponent } from './report-order-scale.component';

describe('ReportOrderScaleComponent', () => {
  let component: ReportOrderScaleComponent;
  let fixture: ComponentFixture<ReportOrderScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOrderScaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportOrderScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
