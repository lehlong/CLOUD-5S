import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSectionLineComponent } from './change-section-line.component';

describe('ChangeSectionLineComponent', () => {
  let component: ChangeSectionLineComponent;
  let fixture: ComponentFixture<ChangeSectionLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSectionLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeSectionLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
