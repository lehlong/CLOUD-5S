import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PourLineCreateComponent } from './pour-line-create.component';

describe('PourLineCreateComponent', () => {
  let component: PourLineCreateComponent;
  let fixture: ComponentFixture<PourLineCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PourLineCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PourLineCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
