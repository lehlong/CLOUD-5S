import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpIndexComponent } from './otp-index.component';

describe('OtpIndexComponent', () => {
  let component: OtpIndexComponent;
  let fixture: ComponentFixture<OtpIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
