import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVoucherIndexComponent } from './payment-voucher-index.component';

describe('PaymentVoucherIndexComponent', () => {
  let component: PaymentVoucherIndexComponent;
  let fixture: ComponentFixture<PaymentVoucherIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentVoucherIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentVoucherIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
