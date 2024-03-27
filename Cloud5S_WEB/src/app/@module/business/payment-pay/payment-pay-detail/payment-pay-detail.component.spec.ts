import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPayDetailComponent } from './payment-pay-detail.component';

describe('PaymentPayDetailComponent', () => {
  let component: PaymentPayDetailComponent;
  let fixture: ComponentFixture<PaymentPayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPayDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
