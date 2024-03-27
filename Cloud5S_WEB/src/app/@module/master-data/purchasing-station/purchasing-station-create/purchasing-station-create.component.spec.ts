import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingStationCreateComponent } from './purchasing-station-create.component';

describe('PurchasingStationCreateComponent', () => {
  let component: PurchasingStationCreateComponent;
  let fixture: ComponentFixture<PurchasingStationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingStationCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasingStationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
