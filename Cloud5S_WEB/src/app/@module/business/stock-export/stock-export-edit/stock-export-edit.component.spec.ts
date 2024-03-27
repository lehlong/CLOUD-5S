import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockExportEditComponent } from './stock-export-edit.component';

describe('StockExportEditComponent', () => {
  let component: StockExportEditComponent;
  let fixture: ComponentFixture<StockExportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockExportEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockExportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
