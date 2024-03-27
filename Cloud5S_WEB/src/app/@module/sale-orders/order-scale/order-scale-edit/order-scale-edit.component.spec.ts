import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderScaleEditComponent } from './order-scale-edit.component';

describe('OrderScaleEditComponent', () => {
  let component: OrderScaleEditComponent;
  let fixture: ComponentFixture<OrderScaleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderScaleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderScaleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
