import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayIndexComponent } from './pay-index.component';

describe('PayIndexComponent', () => {
  let component: PayIndexComponent;
  let fixture: ComponentFixture<PayIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
