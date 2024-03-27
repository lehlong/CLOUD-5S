import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureCommandPrintComponent } from './manufacture-command-print.component';

describe('ManufactureCommandPrintComponent', () => {
  let component: ManufactureCommandPrintComponent;
  let fixture: ComponentFixture<ManufactureCommandPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufactureCommandPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufactureCommandPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
