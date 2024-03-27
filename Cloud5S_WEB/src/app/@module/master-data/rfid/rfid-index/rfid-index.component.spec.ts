import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidIndexComponent } from './rfid-index.component';

describe('RfidIndexComponent', () => {
  let component: RfidIndexComponent;
  let fixture: ComponentFixture<RfidIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
