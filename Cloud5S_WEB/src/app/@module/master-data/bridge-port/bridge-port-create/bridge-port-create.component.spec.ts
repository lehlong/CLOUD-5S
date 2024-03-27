import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgePortCreateComponent } from './bridge-port-create.component';

describe('BridgePortCreateComponent', () => {
  let component: BridgePortCreateComponent;
  let fixture: ComponentFixture<BridgePortCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridgePortCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BridgePortCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
