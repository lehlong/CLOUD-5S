import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderImportDetailComponent } from './order-import-detail.component';

describe('OrderImportDetailComponent', () => {
  let component: OrderImportDetailComponent;
  let fixture: ComponentFixture<OrderImportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderImportDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderImportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
