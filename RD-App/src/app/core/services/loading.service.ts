import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  subscription: Subscription;

  public isLoading = new BehaviorSubject(false);
  public loadingStatus: boolean;

  constructor() {
    this.subscription = this.isLoading.subscribe((status: boolean) => this.loadingStatus = status);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
