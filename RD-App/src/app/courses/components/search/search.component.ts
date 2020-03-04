import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CoursesService } from './../../services/courses.service';
import { tap, debounceTime, distinctUntilChanged, switchMap, catchError, filter, mergeAll, map, takeWhile } from 'rxjs/operators';
import { Course } from '../../../../app/core/models/course.model';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [CoursesService]
})
export class SearchComponent implements OnInit {

  public isFound: boolean = false;

  constructor(private coursesService: CoursesService) { }

  courses: Course[] = [];

  searchControl: FormControl = new FormControl();

  ngOnInit(): void {

    this.searchControl.valueChanges.pipe(
      map(value => {
        if (value === '') {
          this.isFound = false
          return;
        } else {
          this.isFound = true;
          return value
        };
      }),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value: string) => this.coursesService.getCoursesByTitle(value).pipe(
        catchError(err => EMPTY))
      ),
      tap(res => this.courses = res)
    ).subscribe();
  }
}
