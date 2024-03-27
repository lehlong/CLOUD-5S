import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStockItemIndexComponent } from './report-stock-item-index.component';

describe('ReportStockItemIndexComponent', () => {
  let component: ReportStockItemIndexComponent;
  let fixture: ComponentFixture<ReportStockItemIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStockItemIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportStockItemIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
