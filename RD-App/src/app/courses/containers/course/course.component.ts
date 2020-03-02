import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../app/core/models/course.model';
import { CoursesService } from './../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [CoursesService]
})
export class CourseComponent implements OnInit {

  id: number;
  course: Course;

  constructor(private coursesService: CoursesService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.coursesService.getCourseById(this.id).pipe(
        tap(course => this.course = course)
      ).subscribe();
    }
  }

  onAdd(course: Course): void {
    this.coursesService.addCourse(course).subscribe();
  }

  onEdit(course: Course): void {
    this.coursesService.editCourse(course).subscribe();
  }
}
