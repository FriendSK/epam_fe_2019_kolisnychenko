import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[Highlight]',
})
export class HighlightDirective implements AfterViewInit {

  private isNewCourse: boolean = false;

  @Input() date: any;

  constructor(private elementRef: ElementRef) { }

  private checkCreationDate(): void {

    let creationDate: number = new Date(this.date).getTime();
    let today: number = Date.now();
    this.isNewCourse = (Math.floor(today - creationDate) / (1000 * 3600 * 24)) < 14;

    this.markAsNewCourse();
  }

  private markAsNewCourse (): void {
    if (this.isNewCourse) {
      this.elementRef.nativeElement.children[0].classList.add('new-course')
    }
  }

  ngAfterViewInit(): void {
    this.checkCreationDate();
  }
}
