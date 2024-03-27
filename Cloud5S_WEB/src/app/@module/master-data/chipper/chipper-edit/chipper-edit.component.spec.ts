import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipperEditComponent } from './chipper-edit.component';

describe('ChipperEditComponent', () => {
  let component: ChipperEditComponent;
  let fixture: ComponentFixture<ChipperEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipperEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipperEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
