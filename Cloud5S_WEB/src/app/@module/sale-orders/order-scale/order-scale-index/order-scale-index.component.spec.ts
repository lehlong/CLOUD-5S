import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderScaleIndexComponent } from './order-scale-index.component';

describe('OrderScaleIndexComponent', () => {
  let component: OrderScaleIndexComponent;
  let fixture: ComponentFixture<OrderScaleIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderScaleIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderScaleIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
