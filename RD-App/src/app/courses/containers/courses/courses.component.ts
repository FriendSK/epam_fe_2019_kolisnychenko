import { Observable } from 'rxjs/internal/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../../core/models/course.model';
import { LoadingService } from '../../../core/services/loading.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [CoursesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursesComponent  {

  private courseLimit: string = '4';
  private courseStart: string = '0';

  private param = new HttpParams().set('_start', this.courseStart).set('_end', this.courseLimit);

  public courses$: Observable<Course[]> = this.refreshCourses(this.param);
  public isLoading$: Observable<boolean> = this.loadingService.loadingStatus;

  constructor(private coursesService: CoursesService,
              public loadingService: LoadingService,
              private router: Router) {
  }

  refreshCourses (param: HttpParams): Observable<Course[]> {
     return this.coursesService.getCourses(param);
  }

  onSearch(foundCourses: Observable<Course[]>): void {
    this.courses$ = foundCourses;
  }

  onHandleDelete(id: number): void {
    this.coursesService.deleteCourseById(id);
    this.courses$ = this.refreshCourses(this.param);
  }

  onHandleEdit(id: number): void {
    this.router.navigate([`courses/${id}`]);
  }

  onHandleLoadMore(): void {
    let parsedNumber = +this.courseLimit;
    let incrementedNumber = ++parsedNumber;
    this.courseLimit = incrementedNumber.toString();
    this.param = new HttpParams().append('_start', this.courseStart).append('_end', this.courseLimit);
    this.courses$ = this.refreshCourses(this.param);
  }
}
