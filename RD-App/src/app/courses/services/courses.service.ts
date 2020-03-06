import { Router } from '@angular/router';
import { Course } from '../../core/models/course.model';
import { CoursesApiService } from '../../core/services/courses.api-service';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()

export class CoursesService {

  constructor(private coursesAPIService: CoursesApiService,
    private router: Router) {
  }

  addCourse(course: Course): Observable<Course> {
    return this.coursesAPIService.addCourse(course).pipe(
      tap(() => this.router.navigate(['/courses']))
    );
  }

  editCourse(course: Course): Observable<Course> {
    return this.coursesAPIService.editCourse(course).pipe(
      tap(() => this.router.navigate(['/courses']))
    );
  }

  navigateById(id: number): void {
    this.router.navigate([`/courses/${id}`]);
  }

  getCourses(): Observable<Course[]> {
    return this.coursesAPIService.getCourses();
  }

  deleteCourseById(id: number): void {
    this.coursesAPIService.deleteCourseById(id).subscribe();
  }

  getCourseById(id: number): Observable<Course> {
    return this.coursesAPIService.getCourseById(id);
  }

  getCoursesByTitle(title: string): Observable<Course[]> {
    return this.coursesAPIService.getCoursesByTitle(title);
  }
}
