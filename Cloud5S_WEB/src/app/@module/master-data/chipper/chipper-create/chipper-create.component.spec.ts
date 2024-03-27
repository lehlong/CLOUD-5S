import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipperCreateComponent } from './chipper-create.component';

describe('ChipperCreateComponent', () => {
  let component: ChipperCreateComponent;
  let fixture: ComponentFixture<ChipperCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipperCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipperCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
