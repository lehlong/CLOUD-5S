import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayEditComponent } from './pay-edit.component';

describe('PayEditComponent', () => {
  let component: PayEditComponent;
  let fixture: ComponentFixture<PayEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
