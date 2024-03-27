import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderScalePrintComponent } from './order-scale-print.component';

describe('OrderScalePrintComponent', () => {
  let component: OrderScalePrintComponent;
  let fixture: ComponentFixture<OrderScalePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderScalePrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderScalePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
