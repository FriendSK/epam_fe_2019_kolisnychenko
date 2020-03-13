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
import { Course } from '../../../app/core/models/course.model';

const courseMock: Course =  {
  "title": "Title1",
  "descr": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi inventore veniam blanditiis beatae dolor, repellat harum soluta consequuntur cum architecto temporibus est illo voluptatum? Odit!",
  "id": 1,
  "duration": 100,
  "date": "10/03/20",
  "authors": "Author2"
}

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
  let spy: jasmine.Spy;
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

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('deleteCourseById()', () => {
    it('should delete course by id', () => {
      apiService.deleteCourseById.and.returnValue(of({}));
      service.deleteCourseById(1);
      expect(apiService.deleteCourseById).toHaveBeenCalled()
    });

    it('should call course delete method', () => {
      spyOn(service, 'deleteCourseById');
      service.deleteCourseById(2);
      expect(service.deleteCourseById).toHaveBeenCalled();
    });
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


  describe('editCourse()', () => {
    it('should edit a course ', () => {
      apiService.editCourse.and.returnValue(of(courseMock));
      service.editCourse(courseMock);
      expect(apiService.editCourse).toHaveBeenCalled();
    });

    it('should call course edit method ', () => {
      spyOn(service, 'editCourse');
      service.editCourse(courseMock);
      expect(service.editCourse).toHaveBeenCalled();
    });
  });

  describe('addCourse()', () => {
    it('should add a course ', () => {
      apiService.addCourse.and.returnValue(of(courseMock));
      service.addCourse(courseMock);
      expect(apiService.addCourse).toHaveBeenCalled();
    });

    it('should call course add method ', () => {
      spyOn(service, 'addCourse');
      service.addCourse(courseMock);
      expect(service.addCourse).toHaveBeenCalled();
    });
  });

  xdescribe('navigateById()', () => {
    it('should navigate by id to "/courses/:id" page ', () => {

      router = TestBed.get(Router);
      router.initialNavigation();
      router.navigate(['/courses/2']);
      service.navigateById(2);
      expect(location.path()).toBe('/courses/2');
    });
  });
});
