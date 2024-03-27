import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicegroupIndexComponent } from './devicegroup-index.component';

describe('DevicegroupIndexComponent', () => {
  let component: DevicegroupIndexComponent;
  let fixture: ComponentFixture<DevicegroupIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicegroupIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicegroupIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
