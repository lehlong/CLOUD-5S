import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PourSectionIndexComponent } from './pour-section-index.component';

describe('PourSectionIndexComponent', () => {
  let component: PourSectionIndexComponent;
  let fixture: ComponentFixture<PourSectionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PourSectionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PourSectionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
