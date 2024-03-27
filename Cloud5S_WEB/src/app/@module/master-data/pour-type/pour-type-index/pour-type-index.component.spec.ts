import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PourTypeIndexComponent } from './pour-type-index.component';

describe('PourTypeIndexComponent', () => {
  let component: PourTypeIndexComponent;
  let fixture: ComponentFixture<PourTypeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PourTypeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PourTypeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
