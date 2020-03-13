import { async, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('AboutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  it('should create footer component', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    const footer = fixture.componentInstance;
    expect(footer).toBeTruthy();
  });
});
