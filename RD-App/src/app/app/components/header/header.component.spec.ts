import { async, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  it('should create header component', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const footer = fixture.componentInstance;
    expect(footer).toBeTruthy();
  });
});
