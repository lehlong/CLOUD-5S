import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaIndexComponent } from './area-index.component';

describe('AreaIndexComponent', () => {
  let component: AreaIndexComponent;
  let fixture: ComponentFixture<AreaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
