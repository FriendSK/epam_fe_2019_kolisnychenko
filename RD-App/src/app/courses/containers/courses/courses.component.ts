import { Component, OnInit } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../../core/models/course.model';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [CoursesService]
})
export class CoursesComponent implements OnInit {

  public courses: Course[];

  constructor(private coursesService: CoursesService,
              public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.coursesService.getCourses().pipe(
      tap(data => this.courses = data)
    ).subscribe();
  }

  onHandleDelete(id: number): void {
    this.coursesService.deleteCourseById(id).pipe(
      switchMap(() => this.coursesService.getCourses()),
      tap(data => this.courses = data)
    ).subscribe();
  }

  onHandleEdit(id: number): void {
    this.coursesService.navigateById(id);
  }
}
