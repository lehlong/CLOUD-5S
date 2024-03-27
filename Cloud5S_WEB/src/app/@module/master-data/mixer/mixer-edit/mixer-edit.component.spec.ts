import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixerEditComponent } from './mixer-edit.component';

describe('MixerEditComponent', () => {
  let component: MixerEditComponent;
  let fixture: ComponentFixture<MixerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixerEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
