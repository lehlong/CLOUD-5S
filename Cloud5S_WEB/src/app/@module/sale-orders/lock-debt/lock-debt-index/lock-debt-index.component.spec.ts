import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockDebtIndexComponent } from './lock-debt-index.component';

describe('LockDebtIndexComponent', () => {
  let component: LockDebtIndexComponent;
  let fixture: ComponentFixture<LockDebtIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockDebtIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockDebtIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
