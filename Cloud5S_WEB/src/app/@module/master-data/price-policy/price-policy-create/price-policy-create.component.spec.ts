import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePolicyCreateComponent } from './price-policy-create.component';

describe('PricePolicyCreateComponent', () => {
  let component: PricePolicyCreateComponent;
  let fixture: ComponentFixture<PricePolicyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePolicyCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePolicyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
