import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReleaseInfoComponent } from './order-release-info.component';

describe('OrderReleaseInfoComponent', () => {
  let component: OrderReleaseInfoComponent;
  let fixture: ComponentFixture<OrderReleaseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReleaseInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReleaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
