import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderImportIndexComponent } from './order-import-index.component';

describe('OrderImportIndexComponent', () => {
  let component: OrderImportIndexComponent;
  let fixture: ComponentFixture<OrderImportIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderImportIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderImportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
