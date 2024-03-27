import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixerIndexComponent } from './mixer-index.component';

describe('MixerIndexComponent', () => {
  let component: MixerIndexComponent;
  let fixture: ComponentFixture<MixerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixerIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
