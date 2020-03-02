import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { rangeValidator } from './../../../core/validators/range.validator';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  courseForm =this.formBilder.group({
    title: ['', Validators.required, Validators.maxLength(50)],
    description:  ['', Validators.required, Validators.maxLength(50)],
    date:  ['', Validators.required],
    duration:  ['', Validators.required, rangeValidator],
    authors: ['', Validators.required]
  });

  constructor(private formBilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
