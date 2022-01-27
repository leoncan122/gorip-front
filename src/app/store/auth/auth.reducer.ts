import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import * as submitActions from './auth.action';
import { initialState } from './auth.state';

export const authReducer = createReducer(
  initialState,
  on(submitActions.submitLoginSuccess, (state, { res }) => ({
    ...state,
    ...res,
  })),
  on(submitActions.submitLoginFailure, (state, res) => {
    return { ...state, ...res, isActive: false };
  }),
  on(submitActions.submitSignUpSuccess, (state, { res }) => {
    return { ...state, ...res };
  }),
  on(submitActions.submitSignUpFailure, (state, { res }) => {
    return { ...state, ...res };
  })
);
