import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderReleaseCreateComponent} from './order-release-create.component';

describe('BatchingCreateComponent', () => {
  let component: OrderReleaseCreateComponent;
  let fixture: ComponentFixture<OrderReleaseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderReleaseCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderReleaseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
