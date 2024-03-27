import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingShiftCreateComponent } from './working-shift-create.component';

describe('WorkingShiftCreateComponent', () => {
  let component: WorkingShiftCreateComponent;
  let fixture: ComponentFixture<WorkingShiftCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingShiftCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingShiftCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
