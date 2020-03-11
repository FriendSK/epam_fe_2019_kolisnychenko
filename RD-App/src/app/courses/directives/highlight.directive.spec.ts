import { Component, ViewChild, DebugElement } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<app-high-light Highlight>
                <div></div>
             </app-high-light>`
})
class HighlightComponent {
  @ViewChild(HighlightDirective) directive: HighlightDirective;
}

fdescribe('HighlightDirective', () => {
  let component: HighlightComponent;
  let fixture: ComponentFixture<HighlightComponent>;
  let divEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightComponent, HighlightDirective]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HighlightComponent);
    component = fixture.componentInstance;
    divEl = fixture.debugElement.query(By.directive(HighlightDirective));
    fixture.detectChanges();
  }));

  it('should create an instance', () => {
    const directive = new HighlightDirective(divEl);
    expect(directive).toBeTruthy();
  });

  it('should highlight a new course element', () => {
    component.directive.date = '10/03/20';
    fixture.detectChanges();
    component.directive.ngAfterViewInit();
    expect(divEl.nativeElement.children[0].className).toBe('new-course');
  });
});
