import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportIndexComponent } from './export-index.component';

describe('ExportIndexComponent', () => {
  let component: ExportIndexComponent;
  let fixture: ComponentFixture<ExportIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
