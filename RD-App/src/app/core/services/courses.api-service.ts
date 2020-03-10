import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Observable } from 'rxjs/internal/Observable';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CoursesApiService {

  constructor(private httpClient: HttpClient) { }

  getCourses(param1: number, param2: number): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${BASE_URL}/courses?_start=${param1}&_limit=${param2}`);
  }

  deleteCourseById(id: number): Observable<{}> {
    return this.httpClient.delete<Course>(`${BASE_URL}/courses/${id}`);
  }

  addCourse(course: Course): Observable<Course> {
    return this.httpClient.post<Course>(`${BASE_URL}/courses/`, course);
  }

  editCourse(course: Course): Observable<Course> {
    return this.httpClient.put<Course>(`${BASE_URL}/courses/${course.id}`, course);
  }

  getCourseById(id: number): Observable<Course> {
    return this.httpClient.get<Course>(`${BASE_URL}/courses/${id}`);
  }

  getCoursesByTitle(title: string): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${BASE_URL}/courses?title_like=${title}`);
  }
}
