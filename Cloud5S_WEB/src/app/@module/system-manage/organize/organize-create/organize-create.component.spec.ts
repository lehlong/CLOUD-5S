import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeCreateComponent } from './organize-create.component';

describe('OrganizeCreateComponent', () => {
  let component: OrganizeCreateComponent;
  let fixture: ComponentFixture<OrganizeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
