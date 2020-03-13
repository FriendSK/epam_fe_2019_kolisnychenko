import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

fdescribe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });
});
