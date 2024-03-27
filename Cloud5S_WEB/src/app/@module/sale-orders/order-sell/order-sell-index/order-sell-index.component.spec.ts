import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellIndexComponent } from './order-sell-index.component';

describe('OrderSellIndexComponent', () => {
  let component: OrderSellIndexComponent;
  let fixture: ComponentFixture<OrderSellIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSellIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSellIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
