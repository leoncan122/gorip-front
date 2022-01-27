import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { RootState } from '../store';
import * as authActions from './auth.action';

@Injectable()
export class AuthEffects {
  public submitLogin$ = createEffect(() => {
    return this.action$.pipe(
      ofType(authActions.submitLogin),
      exhaustMap((action) =>
        this.loginService.sendLogin(action.body).pipe(
          map((res) => authActions.submitLoginSuccess({ res })),
          catchError(({ error }) => of(authActions.submitLoginFailure(error)))
        )
      )
    );
  });
  public submitSIgnUp$ = createEffect(()=> {
    return this.action$.pipe(
      ofType(authActions.submitSignup),
      exhaustMap(({body}) => this.loginService.sendSignUp(body).pipe(
        map(res => authActions.submitSignUpSuccess({res}),
        catchError((error) => of(authActions.submitSignUpFailure(error))))
      ))
    )
  })
  constructor(
    private action$: Actions,
    private loginService: LoginService,
    private store: Store<RootState>
  ) {}
}
