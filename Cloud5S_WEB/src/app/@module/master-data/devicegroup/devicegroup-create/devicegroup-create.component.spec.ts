import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicegroupCreateComponent } from './devicegroup-create.component';

describe('DevicegroupCreateComponent', () => {
  let component: DevicegroupCreateComponent;
  let fixture: ComponentFixture<DevicegroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicegroupCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicegroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
