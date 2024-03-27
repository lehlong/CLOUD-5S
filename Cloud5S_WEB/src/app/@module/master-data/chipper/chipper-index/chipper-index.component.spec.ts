import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipperIndexComponent } from './chipper-index.component';

describe('ChipperIndexComponent', () => {
  let component: ChipperIndexComponent;
  let fixture: ComponentFixture<ChipperIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipperIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipperIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
