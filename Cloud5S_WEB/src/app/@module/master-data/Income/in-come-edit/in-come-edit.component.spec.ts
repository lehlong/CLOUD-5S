import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InComeEditComponent } from './in-come-edit.component';

describe('InComeEditComponent', () => {
  let component: InComeEditComponent;
  let fixture: ComponentFixture<InComeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InComeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InComeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
