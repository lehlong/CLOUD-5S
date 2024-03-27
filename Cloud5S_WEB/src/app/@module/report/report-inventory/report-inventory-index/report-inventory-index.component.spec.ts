import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInventoryIndexComponent } from './report-inventory-index.component';

describe('ReportInventoryIndexComponent', () => {
  let component: ReportInventoryIndexComponent;
  let fixture: ComponentFixture<ReportInventoryIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInventoryIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportInventoryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
