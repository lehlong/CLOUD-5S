import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCareIndexComponent } from './customer-care-index.component';

describe('CustomerCareIndexComponent', () => {
  let component: CustomerCareIndexComponent;
  let fixture: ComponentFixture<CustomerCareIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCareIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCareIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
