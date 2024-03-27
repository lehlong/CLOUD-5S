import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypeIndexComponent } from './device-type-index.component';

describe('DeviceTypeIndexComponent', () => {
  let component: DeviceTypeIndexComponent;
  let fixture: ComponentFixture<DeviceTypeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTypeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceTypeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
