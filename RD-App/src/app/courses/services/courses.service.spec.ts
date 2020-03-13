import { CoursesApiService } from './../../core/services/courses.api-service';
import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import SpyObj = jasmine.SpyObj;
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

const apiMethods = [
  'addCourse',
  'editCourse',
  'navigateById',
  'getCourses',
  'deleteCourseById',
  'getCourseById',
  'getCoursesByTitle'
]

fdescribe('CoursesService', () => {
  let service: CoursesService;
  let apiService: SpyObj<CoursesApiService>;
  let location: Location;
  let router: Router;

  beforeEach(() => {
    const coursesApiServiceSpy = jasmine.createSpyObj('CoursesApiService', apiMethods)
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CoursesService,
        Location,
        {
          provide: CoursesApiService,
          useValue: coursesApiServiceSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(CoursesService);
    apiService = TestBed.inject(CoursesApiService) as SpyObj<CoursesApiService>;
    location = TestBed.get(Location);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('deleteCourseById()', () => {
    it('should delete course by id', () => {
      apiService.deleteCourseById.and.returnValue(of({}));
    });

    //     it('should call course delete method', () => {
    //     //   spyOn(service, 'deleteCourseById');
    //       service.deleteCourseById(2);
    //       expect(service.deleteCourseById).toHaveBeenCalled();
    //     });
  });

  describe('getCourseById()', () => {
    it('should get course by id', () => {
      service.getCourseById(2);
      expect(apiService.getCourseById).toHaveBeenCalled();
    });
  });

  describe('getCoursesByTitle()', () => {
    it('should get course by title', () => {
      service.getCoursesByTitle("title");
      expect(apiService.getCoursesByTitle).toHaveBeenCalled();
    });
  });

  describe('getCourses()', () => {
    it('should get all courses ', () => {
      let param = new HttpParams();
      service.getCourses(param);
      expect(apiService.getCourses).toHaveBeenCalled();
    });
  });

  xdescribe('navigateById()', () => {
    it('should navigate by id to "/courses/:id" page ', () => {

      router = TestBed.get(Router);
      router.initialNavigation();
      service.navigateById(2);

      expect(location.path()).toBe('/courses/2');

    });
  });
});
