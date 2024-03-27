import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidEditComponent } from './rfid-edit.component';

describe('RfidEditComponent', () => {
  let component: RfidEditComponent;
  let fixture: ComponentFixture<RfidEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
