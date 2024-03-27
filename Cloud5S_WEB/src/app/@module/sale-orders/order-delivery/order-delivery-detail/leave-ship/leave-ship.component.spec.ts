import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveShipComponent } from './leave-ship.component';

describe('LeaveShipComponent', () => {
  let component: LeaveShipComponent;
  let fixture: ComponentFixture<LeaveShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveShipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
