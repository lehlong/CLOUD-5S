import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderImportCreateComponent } from './order-import-create.component';

describe('OrderImportCreateComponent', () => {
  let component: OrderImportCreateComponent;
  let fixture: ComponentFixture<OrderImportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderImportCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderImportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
