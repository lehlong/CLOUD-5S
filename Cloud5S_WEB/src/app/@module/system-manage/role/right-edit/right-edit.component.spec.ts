import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightEditComponent } from './right-edit.component';

describe('RightEditComponent', () => {
  let component: RightEditComponent;
  let fixture: ComponentFixture<RightEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
