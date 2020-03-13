import { async, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('FooterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  it('should create footer component', () => {
    const fixture = TestBed.createComponent(LoaderComponent);
    const footer = fixture.componentInstance;
    expect(footer).toBeTruthy();
  });
});
