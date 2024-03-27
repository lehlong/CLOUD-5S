import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderExportPrintComponent } from './order-export-print.component';

describe('OrderExportPrintComponent', () => {
  let component: OrderExportPrintComponent;
  let fixture: ComponentFixture<OrderExportPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderExportPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderExportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
