import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CoursesService } from './../../services/courses.service';
import { tap, debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { Course } from '../../../../app/core/models/course.model';
import { EMPTY, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [CoursesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {

  public isFound: boolean = false;

  constructor(private coursesService: CoursesService,
              private cd: ChangeDetectorRef) { }

  courses: Course[] = [];
  subscription: Subscription;

  searchControl: FormControl = new FormControl();

  ngOnInit(): void {

    this.subscription = this.searchControl.valueChanges.pipe(
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
      tap(res => { this.courses = res; this.cd.markForCheck() })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
