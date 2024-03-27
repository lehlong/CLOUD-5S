import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutIndexComponent } from './in-out-index.component';

describe('InOutIndexComponent', () => {
  let component: InOutIndexComponent;
  let fixture: ComponentFixture<InOutIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InOutIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InOutIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
