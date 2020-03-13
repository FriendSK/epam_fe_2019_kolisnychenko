import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoadingInterceptorService } from './loading.interceptor.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';

fdescribe('InterceptService', () => {
  let service: LoadingInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingInterceptorService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(LoadingInterceptorService);
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('intercept()', () => {
    it('should call intercept method', () => {
      let req: HttpRequest<any>;
      let next: HttpHandler;
      spyOn(service, 'intercept').and.returnValue(new Observable<HttpEvent<any>>());
      service.intercept(req, next);
      expect(service.intercept).toHaveBeenCalled();
    });
  });
});
