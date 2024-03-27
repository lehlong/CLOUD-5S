import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingShiftIndexComponent } from './working-shift-index.component';

describe('WorkingShiftIndexComponent', () => {
  let component: WorkingShiftIndexComponent;
  let fixture: ComponentFixture<WorkingShiftIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingShiftIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingShiftIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
