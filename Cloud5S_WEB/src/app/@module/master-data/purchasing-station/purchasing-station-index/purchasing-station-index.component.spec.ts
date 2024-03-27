import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingStationIndexComponent } from './purchasing-station-index.component';

describe('PurchasingStationIndexComponent', () => {
  let component: PurchasingStationIndexComponent;
  let fixture: ComponentFixture<PurchasingStationIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingStationIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasingStationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
