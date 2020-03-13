import { async, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

fdescribe('FooterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
      .compileComponents();
  }));

  it('should create footer component', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const footer = fixture.componentInstance;
    expect(footer).toBeTruthy();
  });
});
