import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMoistureIndexComponent } from './report-moisture-index.component';

describe('ReportMoistureIndexComponent', () => {
  let component: ReportMoistureIndexComponent;
  let fixture: ComponentFixture<ReportMoistureIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMoistureIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportMoistureIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
