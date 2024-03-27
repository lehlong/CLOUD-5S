import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeIndexComponent } from './organize-index.component';

describe('OrganizeIndexComponent', () => {
  let component: OrganizeIndexComponent;
  let fixture: ComponentFixture<OrganizeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
