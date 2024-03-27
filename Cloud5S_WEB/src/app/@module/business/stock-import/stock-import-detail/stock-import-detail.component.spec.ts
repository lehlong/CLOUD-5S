import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockImportDetailComponent } from './stock-import-detail.component';

describe('StockImportDetailComponent', () => {
  let component: StockImportDetailComponent;
  let fixture: ComponentFixture<StockImportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockImportDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockImportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
