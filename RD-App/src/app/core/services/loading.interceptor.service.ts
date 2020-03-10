import { Injectable, OnDestroy } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LoadingService } from './loading.service';
import { throwError, Subscription } from 'rxjs';


@Injectable()
export class LoadingInterceptorService implements HttpInterceptor, OnDestroy {

  subscription: Subscription;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.isLoading.next(true);
    return new Observable(observer => {
      this.subscription = next.handle(req).subscribe(event => {
        console.log(req);

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
