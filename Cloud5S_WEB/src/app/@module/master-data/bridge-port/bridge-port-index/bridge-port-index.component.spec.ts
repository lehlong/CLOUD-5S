import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgePortIndexComponent } from './bridge-port-index.component';

describe('BridgePortIndexComponent', () => {
  let component: BridgePortIndexComponent;
  let fixture: ComponentFixture<BridgePortIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridgePortIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BridgePortIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
