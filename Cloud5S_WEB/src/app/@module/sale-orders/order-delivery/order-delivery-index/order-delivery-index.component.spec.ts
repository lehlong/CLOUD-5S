import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeliveryIndexComponent } from './order-delivery-index.component';

describe('OrderDeliveryIndexComponent', () => {
  let component: OrderDeliveryIndexComponent;
  let fixture: ComponentFixture<OrderDeliveryIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDeliveryIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDeliveryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
