import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeliveryDetailComponent } from './order-delivery-detail.component';

describe('OrderDeliveryDetailComponent', () => {
  let component: OrderDeliveryDetailComponent;
  let fixture: ComponentFixture<OrderDeliveryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDeliveryDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDeliveryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
