import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityEvaluateIndexComponent } from './humidity-evaluate-index.component';

describe('HumidityEvaluateIndexComponent', () => {
  let component: HumidityEvaluateIndexComponent;
  let fixture: ComponentFixture<HumidityEvaluateIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumidityEvaluateIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumidityEvaluateIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
