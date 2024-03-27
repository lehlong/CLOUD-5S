import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PourSectionEditComponent } from './pour-section-edit.component';

describe('PourSectionEditComponent', () => {
  let component: PourSectionEditComponent;
  let fixture: ComponentFixture<PourSectionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PourSectionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PourSectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
