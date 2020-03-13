import { async, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

fdescribe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })
      .compileComponents();
  }));

  it('should create header component', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const footer = fixture.componentInstance;
    expect(footer).toBeTruthy();
  });
});
