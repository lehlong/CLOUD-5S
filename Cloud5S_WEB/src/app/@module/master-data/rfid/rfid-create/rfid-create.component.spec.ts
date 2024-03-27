import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidCreateComponent } from './rfid-create.component';

describe('RfidCreateComponent', () => {
  let component: RfidCreateComponent;
  let fixture: ComponentFixture<RfidCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
