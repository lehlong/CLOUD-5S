import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCreateComponent } from './pay-create.component';

describe('PayCreateComponent', () => {
  let component: PayCreateComponent;
  let fixture: ComponentFixture<PayCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
