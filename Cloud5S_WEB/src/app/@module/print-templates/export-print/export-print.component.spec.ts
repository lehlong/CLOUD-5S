import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPrintComponent } from './export-print.component';

describe('ExportPrintComponent', () => {
  let component: ExportPrintComponent;
  let fixture: ComponentFixture<ExportPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
