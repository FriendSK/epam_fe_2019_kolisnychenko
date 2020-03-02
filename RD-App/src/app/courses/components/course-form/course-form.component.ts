import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { rangeValidatorParam } from './../../../core/validators/range.validator';
import { Course } from '../../../../app/core/models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  id: number;
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
    title: ['', [Validators.required, Validators.maxLength(50)]],
    descr: ['', [Validators.required, Validators.maxLength(250)]],
    date: ['', [Validators.required]],
    duration: ['', [Validators.required, rangeValidatorParam(1, 600)]],
    authors: ['', Validators.required]
  });

  get isTitleRangeInvalid(): boolean {
    const title = this.courseForm.get('title');
    return title.errors && title.touched;
  }

  get isDescrRangeInvalid(): boolean {
    const descr = this.courseForm.get('descr');
    return descr.errors && descr.touched;
  }

  get isDurationRangeInvalid(): boolean {
    const duration = this.courseForm.get('duration');
    return duration.hasError('range') && duration.touched;
  }

  constructor(private formBilder: FormBuilder) { }

  ngOnInit(): void {
  }

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
