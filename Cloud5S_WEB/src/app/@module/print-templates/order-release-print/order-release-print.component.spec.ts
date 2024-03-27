import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReleasePrintComponent } from './order-release-print.component';

describe('OrderReleasePrintComponent', () => {
  let component: OrderReleasePrintComponent;
  let fixture: ComponentFixture<OrderReleasePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReleasePrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReleasePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
