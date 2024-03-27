import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListOrderComponent } from './customer-list-order.component';

describe('CustomerListOrderComponent', () => {
  let component: CustomerListOrderComponent;
  let fixture: ComponentFixture<CustomerListOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerListOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerListOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
