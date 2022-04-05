import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { first, flatMap, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../store/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store<RootState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store
      .select((state) => state.user.token)
      .pipe(
        first(),
        flatMap((token) => {
          const authReq = !!token
            ? request.clone({
                setHeaders: { Authorization: 'Bearer ' + token },
              })
            : request;
          return next.handle(authReq);
        })
      );
  }
}
