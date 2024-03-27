import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRetrievalIndexComponent } from './password-retrieval-index.component';

describe('PasswordRetrievalIndexComponent', () => {
  let component: PasswordRetrievalIndexComponent;
  let fixture: ComponentFixture<PasswordRetrievalIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRetrievalIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRetrievalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
