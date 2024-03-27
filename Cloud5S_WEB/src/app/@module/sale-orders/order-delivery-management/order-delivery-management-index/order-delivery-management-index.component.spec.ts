import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderDeliveryManagementIndexComponent} from './order-delivery-management-index.component';

describe('OrderDeliveryManagementIndexComponent', () => {
  let component: OrderDeliveryManagementIndexComponent;
  let fixture: ComponentFixture<OrderDeliveryManagementIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDeliveryManagementIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDeliveryManagementIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
