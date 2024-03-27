import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePolicyIndexComponent } from './price-policy-index.component';

describe('PricePolicyIndexComponent', () => {
  let component: PricePolicyIndexComponent;
  let fixture: ComponentFixture<PricePolicyIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePolicyIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePolicyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
