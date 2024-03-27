import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtIndexComponent } from './debt-index.component';

describe('DebtIndexComponent', () => {
  let component: DebtIndexComponent;
  let fixture: ComponentFixture<DebtIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
