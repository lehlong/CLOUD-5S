import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutImgComponent } from './in-out-img.component';

describe('InOutImgComponent', () => {
  let component: InOutImgComponent;
  let fixture: ComponentFixture<InOutImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InOutImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InOutImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
