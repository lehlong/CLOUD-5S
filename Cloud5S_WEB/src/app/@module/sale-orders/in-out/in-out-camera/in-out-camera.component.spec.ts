import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutCameraComponent } from './in-out-camera.component';

describe('InOutCameraComponent', () => {
  let component: InOutCameraComponent;
  let fixture: ComponentFixture<InOutCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InOutCameraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InOutCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
