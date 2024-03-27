import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PourLineIndexComponent } from './pour-line-index.component';

describe('PourLineIndexComponent', () => {
  let component: PourLineIndexComponent;
  let fixture: ComponentFixture<PourLineIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PourLineIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PourLineIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
