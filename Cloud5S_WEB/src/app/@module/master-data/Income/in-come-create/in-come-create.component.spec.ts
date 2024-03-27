import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InComeCreateComponent } from './in-come-create.component';

describe('InComeCreateComponent', () => {
  let component: InComeCreateComponent;
  let fixture: ComponentFixture<InComeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InComeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InComeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
