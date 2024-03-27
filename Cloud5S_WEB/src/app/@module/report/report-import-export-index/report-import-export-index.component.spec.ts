import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportImportExportIndexComponent } from './report-import-export-index.component';

describe('ReportImportExportIndexComponent', () => {
  let component: ReportImportExportIndexComponent;
  let fixture: ComponentFixture<ReportImportExportIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportImportExportIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportImportExportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
