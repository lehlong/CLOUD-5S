import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerIndexComponent } from './partner-index.component';

describe('PartnerIndexComponent', () => {
  let component: PartnerIndexComponent;
  let fixture: ComponentFixture<PartnerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
