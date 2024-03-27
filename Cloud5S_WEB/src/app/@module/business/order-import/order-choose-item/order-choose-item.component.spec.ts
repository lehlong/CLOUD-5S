import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChooseItemComponent } from './order-choose-item.component';

describe('OrderChooseItemComponent', () => {
  let component: OrderChooseItemComponent;
  let fixture: ComponentFixture<OrderChooseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderChooseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderChooseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
