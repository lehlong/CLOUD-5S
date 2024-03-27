import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightCreateComponent } from './right-create.component';

describe('RightCreateComponent', () => {
  let component: RightCreateComponent;
  let fixture: ComponentFixture<RightCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
