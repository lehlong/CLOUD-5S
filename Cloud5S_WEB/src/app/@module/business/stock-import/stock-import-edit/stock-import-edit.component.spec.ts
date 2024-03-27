import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockImportEditComponent } from './stock-import-edit.component';

describe('StockImportEditComponent', () => {
  let component: StockImportEditComponent;
  let fixture: ComponentFixture<StockImportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockImportEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockImportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
