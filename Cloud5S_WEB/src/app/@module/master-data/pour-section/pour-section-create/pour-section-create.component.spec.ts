import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PourSectionCreateComponent } from './pour-section-create.component';

describe('PourSectionCreateComponent', () => {
  let component: PourSectionCreateComponent;
  let fixture: ComponentFixture<PourSectionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PourSectionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PourSectionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
