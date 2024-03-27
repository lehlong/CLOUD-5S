import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicegroupEditComponent } from './devicegroup-edit.component';

describe('DevicegroupEditComponent', () => {
  let component: DevicegroupEditComponent;
  let fixture: ComponentFixture<DevicegroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicegroupEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicegroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
