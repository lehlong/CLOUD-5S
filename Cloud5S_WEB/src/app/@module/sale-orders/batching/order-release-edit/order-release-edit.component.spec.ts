import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderReleaseEditComponent} from './order-release-edit.component';

describe('BatchingEditComponent', () => {
  let component: OrderReleaseEditComponent;
  let fixture: ComponentFixture<OrderReleaseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderReleaseEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderReleaseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
