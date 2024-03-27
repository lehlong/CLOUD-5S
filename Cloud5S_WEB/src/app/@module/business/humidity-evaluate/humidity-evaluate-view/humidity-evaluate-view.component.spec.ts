import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityEvaluateViewComponent } from './humidity-evaluate-view.component';

describe('HumidityEvaluateViewComponent', () => {
  let component: HumidityEvaluateViewComponent;
  let fixture: ComponentFixture<HumidityEvaluateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumidityEvaluateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumidityEvaluateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
