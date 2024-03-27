import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InComeIndexComponent } from './in-come-index.component';

describe('InComeIndexComponent', () => {
  let component: InComeIndexComponent;
  let fixture: ComponentFixture<InComeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InComeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InComeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
