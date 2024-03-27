import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IncomeIndexComponent} from './income-index.component';

describe('IncomeIndexComponent', () => {
  let component: IncomeIndexComponent;
  let fixture: ComponentFixture<IncomeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
