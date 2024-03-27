import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCareEditComponent } from './customer-care-edit.component';

describe('CustomerCareEditComponent', () => {
  let component: CustomerCareEditComponent;
  let fixture: ComponentFixture<CustomerCareEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCareEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCareEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
