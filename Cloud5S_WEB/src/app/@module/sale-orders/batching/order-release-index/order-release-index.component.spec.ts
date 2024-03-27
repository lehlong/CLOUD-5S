import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderReleaseIndexComponent} from './order-release-index.component';

describe('OrderReleaseIndexComponent', () => {
  let component: OrderReleaseIndexComponent;
  let fixture: ComponentFixture<OrderReleaseIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderReleaseIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderReleaseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
