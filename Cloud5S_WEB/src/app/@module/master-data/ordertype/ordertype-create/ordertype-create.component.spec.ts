import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdertypeCreateComponent } from './ordertype-create.component';

describe('OrdertypeCreateComponent', () => {
  let component: OrdertypeCreateComponent;
  let fixture: ComponentFixture<OrdertypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdertypeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdertypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
