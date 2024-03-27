import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingShiftEditComponent } from './working-shift-edit.component';

describe('WorkingShiftEditComponent', () => {
  let component: WorkingShiftEditComponent;
  let fixture: ComponentFixture<WorkingShiftEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingShiftEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingShiftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
