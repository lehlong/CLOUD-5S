import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeliveryEditComponent } from './order-delivery-edit.component';

describe('OrderDeliveryEditComponent', () => {
  let component: OrderDeliveryEditComponent;
  let fixture: ComponentFixture<OrderDeliveryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDeliveryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDeliveryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
