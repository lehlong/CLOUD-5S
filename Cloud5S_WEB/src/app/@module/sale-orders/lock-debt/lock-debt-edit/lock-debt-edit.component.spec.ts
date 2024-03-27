import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockDebtEditComponent } from './lock-debt-edit.component';

describe('LockDebtEditComponent', () => {
  let component: LockDebtEditComponent;
  let fixture: ComponentFixture<LockDebtEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockDebtEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockDebtEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
