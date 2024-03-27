import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStockExportIndexComponent } from './report-stock-export-index.component';

describe('ReportStockExportIndexComponent', () => {
  let component: ReportStockExportIndexComponent;
  let fixture: ComponentFixture<ReportStockExportIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStockExportIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportStockExportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
