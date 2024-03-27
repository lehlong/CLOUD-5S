import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanManagementIndexComponent } from './plan-management-index.component';

describe('PlanManagementIndexComponent', () => {
  let component: PlanManagementIndexComponent;
  let fixture: ComponentFixture<PlanManagementIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanManagementIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanManagementIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
