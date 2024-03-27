import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdertypeIndexComponent } from './ordertype-index.component';

describe('OrdertypeIndexComponent', () => {
  let component: OrdertypeIndexComponent;
  let fixture: ComponentFixture<OrdertypeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdertypeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdertypeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
