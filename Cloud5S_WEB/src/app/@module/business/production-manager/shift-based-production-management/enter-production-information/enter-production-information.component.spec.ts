import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterProductionInformationComponent } from './enter-production-information.component';

describe('EnterProductionInformationComponent', () => {
  let component: EnterProductionInformationComponent;
  let fixture: ComponentFixture<EnterProductionInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterProductionInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterProductionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
