import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocxComponent } from './view-docx.component';

describe('ViewDocxComponent', () => {
  let component: ViewDocxComponent;
  let fixture: ComponentFixture<ViewDocxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDocxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDocxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
