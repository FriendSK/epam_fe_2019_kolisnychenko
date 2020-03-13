import { TestBed } from '@angular/core/testing';
import { CoursesApiService } from './courses.api-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

fdescribe('CoursesApiService', () => {
  let service: CoursesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesApiService,
        HttpClient,
        HttpHandler
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(CoursesApiService);
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });
});
