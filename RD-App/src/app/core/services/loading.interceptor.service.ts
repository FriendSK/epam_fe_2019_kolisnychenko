import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LoadingService } from './loading.service';
import { throwError } from 'rxjs';


@Injectable()
export class LoadingInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.isLoading.next(true);
    return new Observable(observer => {
      const subscription = next.handle(req).subscribe(event => {
        if (event instanceof HttpResponse) {
          observer.next(event);
          this.loadingService.isLoading.next(false);
        }
      }, err => {
        this.loadingService.isLoading.next(false);
        throwError(err);
      })
    });
  }
  constructor(private loadingService: LoadingService) { }
}
