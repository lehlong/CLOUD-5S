import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftBasedProductionManagementComponent } from './shift-based-production-management.component';

describe('ShiftBasedProductionManagementComponent', () => {
  let component: ShiftBasedProductionManagementComponent;
  let fixture: ComponentFixture<ShiftBasedProductionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftBasedProductionManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftBasedProductionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
