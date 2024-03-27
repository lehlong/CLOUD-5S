import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReportIndexComponent } from './total-report-index.component';

describe('TotalReportIndexComponent', () => {
  let component: TotalReportIndexComponent;
  let fixture: ComponentFixture<TotalReportIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReportIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
