import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportScaleWeightIndexComponent } from './report-scale-weight-index.component';

describe('ReportScaleWeightIndexComponent', () => {
  let component: ReportScaleWeightIndexComponent;
  let fixture: ComponentFixture<ReportScaleWeightIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportScaleWeightIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportScaleWeightIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
