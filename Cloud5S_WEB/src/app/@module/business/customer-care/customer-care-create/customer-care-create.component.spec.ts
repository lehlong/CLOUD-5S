import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCareCreateComponent } from './customer-care-create.component';

describe('CustomerCareCreateComponent', () => {
  let component: CustomerCareCreateComponent;
  let fixture: ComponentFixture<CustomerCareCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCareCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCareCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
