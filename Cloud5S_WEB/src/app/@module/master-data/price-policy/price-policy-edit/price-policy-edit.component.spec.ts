import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePolicyEditComponent } from './price-policy-edit.component';

describe('PricePolicyEditComponent', () => {
  let component: PricePolicyEditComponent;
  let fixture: ComponentFixture<PricePolicyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePolicyEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePolicyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
