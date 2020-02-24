import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../app/core/models/course.model';
import { CoursesApiService } from '../../core/services/courses.api-service';

@Injectable()

export class CoursesService {

  constructor(private coursesAPIService: CoursesApiService) { }

  getCourses(): Observable<Course[]> {
      return this.coursesAPIService.getCourses();
  }

  deleteCourse(id: number): Observable<{}> {
      return this.coursesAPIService.deleteCourse(id);
  }
}
