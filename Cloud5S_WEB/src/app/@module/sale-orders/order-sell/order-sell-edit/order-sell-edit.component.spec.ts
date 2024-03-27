import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellEditComponent } from './order-sell-edit.component';

describe('OrderSellEditComponent', () => {
  let component: OrderSellEditComponent;
  let fixture: ComponentFixture<OrderSellEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSellEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSellEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
