import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LoadingService } from './loading.service';


@Injectable()
export class LoadingInterceptorService implements HttpInterceptor {

    private requests: HttpRequest<any>[] = [];

    public removeRequests(req: HttpRequest<any>) {
        const index = this.requests.indexOf(req);
        if (index >= 0) {
            this.requests.splice(index, 1);
        }
        this.loadingService.isLoading.next(this.requests.length > 0)
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req);
        this.loadingService.isLoading.next(true);
        return new Observable(observer => {
            const subscription = next.handle(req).subscribe(event => {
                if (event instanceof HttpResponse) {
                    this.removeRequests(req);
                    observer.next(event);
                }
            }, err => {
                this.removeRequests(req);
            })
        });
    }
    constructor(private loadingService: LoadingService) { }
}
