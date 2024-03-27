import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockExportIndexComponent } from './stock-export-index.component';

describe('StockExportIndexComponent', () => {
  let component: StockExportIndexComponent;
  let fixture: ComponentFixture<StockExportIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockExportIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockExportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
