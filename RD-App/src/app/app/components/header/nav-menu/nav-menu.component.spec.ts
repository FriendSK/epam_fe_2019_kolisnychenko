import { async, TestBed } from '@angular/core/testing';
import { NavMenuComponent } from './nav-menu.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('NavMenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  it('should create nav-menu component', () => {
    const fixture = TestBed.createComponent(NavMenuComponent);
    const footer = fixture.componentInstance;
    expect(footer).toBeTruthy();
  });
});
