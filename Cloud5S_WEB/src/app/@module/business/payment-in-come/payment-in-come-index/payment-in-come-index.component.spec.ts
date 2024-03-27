import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymentInComeIndexComponent} from './payment-in-come-index.component';

describe('PaymentInComeIndexComponent', () => {
  let component: PaymentInComeIndexComponent;
  let fixture: ComponentFixture<PaymentInComeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentInComeIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentInComeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
