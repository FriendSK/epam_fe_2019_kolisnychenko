import { Observable } from 'rxjs/internal/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
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

export class CourseComponent {

  private id: number;
  public course$: Observable<Course>;

  constructor(private coursesService: CoursesService,
              private activatedRoute: ActivatedRoute) {

    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.course$ = this.coursesService.getCourseById(this.id);
    }
  }

  onAdd(course: Course): void {
    this.coursesService.addCourse(course);
  }

  onEdit(course: Course): void {
    this.coursesService.editCourse(course)
  }
}
