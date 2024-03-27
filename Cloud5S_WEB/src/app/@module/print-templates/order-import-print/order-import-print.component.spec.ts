import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderImportPrintComponent } from './order-import-print.component';

describe('OrderImportPrintComponent', () => {
  let component: OrderImportPrintComponent;
  let fixture: ComponentFixture<OrderImportPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderImportPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderImportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
