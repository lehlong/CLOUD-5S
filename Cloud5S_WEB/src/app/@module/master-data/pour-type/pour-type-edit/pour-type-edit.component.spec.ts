import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PourTypeEditComponent } from './pour-type-edit.component';

describe('PourTypeEditComponent', () => {
  let component: PourTypeEditComponent;
  let fixture: ComponentFixture<PourTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PourTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PourTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
