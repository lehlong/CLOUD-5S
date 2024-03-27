import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVoucherEditComponent } from './payment-voucher-edit.component';

describe('PaymentVoucherEditComponent', () => {
  let component: PaymentVoucherEditComponent;
  let fixture: ComponentFixture<PaymentVoucherEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentVoucherEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentVoucherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
