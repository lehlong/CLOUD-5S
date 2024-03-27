import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderImportEditComponent } from './order-import-edit.component';

describe('OrderImportEditComponent', () => {
  let component: OrderImportEditComponent;
  let fixture: ComponentFixture<OrderImportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderImportEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderImportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
