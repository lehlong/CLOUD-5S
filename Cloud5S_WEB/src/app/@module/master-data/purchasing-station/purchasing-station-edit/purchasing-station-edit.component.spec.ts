import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingStationEditComponent } from './purchasing-station-edit.component';

describe('PurchasingStationEditComponent', () => {
  let component: PurchasingStationEditComponent;
  let fixture: ComponentFixture<PurchasingStationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingStationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasingStationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
