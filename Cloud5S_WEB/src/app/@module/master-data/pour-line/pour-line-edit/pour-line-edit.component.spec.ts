import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PourLineEditComponent } from './pour-line-edit.component';

describe('PourLineEditComponent', () => {
  let component: PourLineEditComponent;
  let fixture: ComponentFixture<PourLineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PourLineEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PourLineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
