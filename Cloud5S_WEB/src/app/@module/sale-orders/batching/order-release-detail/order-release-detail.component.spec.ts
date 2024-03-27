import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReleaseDetailComponent } from './order-release-detail.component';

describe('OrderReleaseDetailComponent', () => {
  let component: OrderReleaseDetailComponent;
  let fixture: ComponentFixture<OrderReleaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReleaseDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReleaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
