import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPayIndexComponent } from './payment-pay-index.component';

describe('PaymentPayIndexComponent', () => {
  let component: PaymentPayIndexComponent;
  let fixture: ComponentFixture<PaymentPayIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPayIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPayIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
