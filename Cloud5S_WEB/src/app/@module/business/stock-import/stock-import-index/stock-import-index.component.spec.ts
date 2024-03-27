import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockImportIndexComponent } from './stock-import-index.component';

describe('StockImportIndexComponent', () => {
  let component: StockImportIndexComponent;
  let fixture: ComponentFixture<StockImportIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockImportIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockImportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
