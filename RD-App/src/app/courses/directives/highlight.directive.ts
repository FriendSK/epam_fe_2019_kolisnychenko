import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[Highlight]',
})
export class HighlightDirective implements AfterViewInit {

    private isNewCourse: boolean = false;

    @Input() date: any;

    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        let date: number = new Date(this.date).getTime();
        let today: number = Date.now();
        this.isNewCourse = (Math.floor(today - date) / (1000 * 3600 * 24)) < 14;

        if (this.isNewCourse) {
            this.elementRef.nativeElement.children[0].classList.add('new-course')
        }
    }
}
