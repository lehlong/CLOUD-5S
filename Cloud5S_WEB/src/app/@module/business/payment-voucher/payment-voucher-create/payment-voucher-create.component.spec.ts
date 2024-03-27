import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVoucherCreateComponent } from './payment-voucher-create.component';

describe('PaymentVoucherCreateComponent', () => {
  let component: PaymentVoucherCreateComponent;
  let fixture: ComponentFixture<PaymentVoucherCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentVoucherCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentVoucherCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
