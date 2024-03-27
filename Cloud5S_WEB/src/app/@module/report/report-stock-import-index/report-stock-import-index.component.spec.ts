import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStockImportIndexComponent } from './report-stock-import-index.component';

describe('ReportStockImportIndexComponent', () => {
  let component: ReportStockImportIndexComponent;
  let fixture: ComponentFixture<ReportStockImportIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStockImportIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportStockImportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
