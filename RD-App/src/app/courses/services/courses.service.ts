import { Router } from '@angular/router';
import { Course } from '../../core/models/course.model';
import { CoursesApiService } from '../../core/services/courses.api-service';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()

export class CoursesService {

  private subs: [] = [];

  constructor(private coursesAPIService: CoursesApiService,
    private router: Router) {
  }

  addCourse(course: Course): void {
    this.coursesAPIService.addCourse(course).pipe(
      tap(() => this.router.navigate(['/courses']))
    ).subscribe();
  }

  editCourse(course: Course): void {
    this.coursesAPIService.editCourse(course).pipe(
      tap(() => this.router.navigate(['/courses']))
    ).subscribe();
  }

  navigateById(id: number): void {
    this.router.navigate([`/courses/${id}`]);
  }

  getCourses(param1: number, param2: number): Observable<Course[]> {
    return this.coursesAPIService.getCourses(param1, param2);
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
