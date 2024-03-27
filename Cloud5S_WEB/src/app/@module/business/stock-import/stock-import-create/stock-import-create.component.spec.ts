import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockImportCreateComponent } from './stock-import-create.component';

describe('StockImportCreateComponent', () => {
  let component: StockImportCreateComponent;
  let fixture: ComponentFixture<StockImportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockImportCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockImportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
