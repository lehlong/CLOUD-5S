import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInComeDetailComponent } from './payment-in-come-detail.component';

describe('PaymentInComeDetailComponent', () => {
  let component: PaymentInComeDetailComponent;
  let fixture: ComponentFixture<PaymentInComeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentInComeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentInComeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
