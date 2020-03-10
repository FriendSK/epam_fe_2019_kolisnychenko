import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { rangeValidatorParam } from './../../../core/validators/range.validator';
import { Course } from '../../../../app/core/models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseFormComponent {

  private id: number;
  existed: boolean;

  @Input() set course(course: Course) {
    if (course && course.id) {
      this.id = course.id;
      this.existed = true;
      this.courseForm.patchValue(course);
    }
  }

  @Output() add: EventEmitter<Course> = new EventEmitter();
  @Output() edit: EventEmitter<Course> = new EventEmitter();

  courseForm = this.formBilder.group({
    title: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
    descr: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
    duration: ['', [Validators.required, rangeValidatorParam(1, 600)]],
    date: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])\/(0[1-9]|1\\d|2\\d|3[01])\/\\d{2}')]],
    authors: ['', Validators.required]
  });

  get isTitleRangeInvalid(): boolean {
    const title = this.courseForm.get('title');
    return title.hasError('maxlength') || title.hasError('minlength') && title.touched;
  }

  get isDescrRangeInvalid(): boolean {
    const descr = this.courseForm.get('descr');
    return descr.hasError('maxlength') || descr.hasError('minlength')  && descr.touched;
  }

  get isDurationRangeInvalid(): boolean {
    const duration = this.courseForm.get('duration');
    return duration.hasError('range') && duration.touched;
  }

  get isDateFormatInvalid(): boolean {
    const date = this.courseForm.get('date');
    return date.hasError('pattern') && date.touched;
  }

  constructor(private formBilder: FormBuilder) { }

  onAdd(): void {
    if (this.courseForm.valid) {
      this.add.emit(this.courseForm.value);
    }
  }

  onEdit(): void {
    if (this.courseForm.valid) {
      this.edit.emit({ ...this.courseForm.value, id: this.id });
    }
  }
}
