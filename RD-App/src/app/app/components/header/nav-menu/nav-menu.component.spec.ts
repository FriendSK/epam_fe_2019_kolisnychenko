import { async, TestBed } from '@angular/core/testing';
import { NavMenuComponent } from './nav-menu.component';

fdescribe('NavMenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavMenuComponent]
    })
      .compileComponents();
  }));

  it('should create nav-menu component', () => {
    const fixture = TestBed.createComponent(NavMenuComponent);
    const footer = fixture.componentInstance;
    expect(footer).toBeTruthy();
  });
});
