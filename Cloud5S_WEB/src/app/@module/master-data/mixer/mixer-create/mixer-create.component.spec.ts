import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixerCreateComponent } from './mixer-create.component';

describe('MixerCreateComponent', () => {
  let component: MixerCreateComponent;
  let fixture: ComponentFixture<MixerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixerCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
