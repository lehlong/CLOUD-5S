import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MenuIndexComponent} from './menu-index.component';

describe('ModuleIndexComponent', () => {
  let component: MenuIndexComponent;
  let fixture: ComponentFixture<MenuIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
