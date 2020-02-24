import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../app/core/models/course.model';
import { CRUD } from 'src/app/app/core/models/crud.model';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CoursesApiService implements CRUD {

  constructor(private httpClient: HttpClient) { }

  getCourses(): Observable<Course[]> {
      return this.httpClient.get<Course[]>(`${BASE_URL}/courses`);
  }

  deleteCourse(id: number): Observable<{}> {
    return this.httpClient.delete<Course[]>(`${BASE_URL}/courses/${id}`);
  }
}
