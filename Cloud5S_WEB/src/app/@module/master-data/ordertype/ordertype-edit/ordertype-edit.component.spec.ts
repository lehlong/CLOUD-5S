import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdertypeEditComponent } from './ordertype-edit.component';

describe('OrdertypeEditComponent', () => {
  let component: OrdertypeEditComponent;
  let fixture: ComponentFixture<OrdertypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdertypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdertypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
