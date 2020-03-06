import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../../../../app/core/models/course.model';
import { CoursesService } from './../../services/courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [CoursesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseComponent implements OnInit {

  id: number;
  course$: Observable<Course>;

  constructor(private coursesService: CoursesService,
              private activatedRoute: ActivatedRoute) {

    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.course$ = this.coursesService.getCourseById(this.id);
    }
  }

  ngOnInit(): void {
  }

  onAdd(course: Course): void {
    this.coursesService.addCourse(course).subscribe();
  }

  onEdit(course: Course): void {
    this.coursesService.editCourse(course).subscribe();
  }
}
