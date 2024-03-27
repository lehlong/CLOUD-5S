import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportImportTotalIndexComponent } from './report-import-total-index.component';

describe('ReportImportTotalIndexComponent', () => {
  let component: ReportImportTotalIndexComponent;
  let fixture: ComponentFixture<ReportImportTotalIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportImportTotalIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportImportTotalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
