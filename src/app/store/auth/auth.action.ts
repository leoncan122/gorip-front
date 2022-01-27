import { createAction, props } from '@ngrx/store';

export const submitLogin = createAction(
  '[Login] submit',
  props<{ body: {} }>()
);

export const submitLoginSuccess = createAction(
  '[Login] submit Success',
  props<{ res: {} }>()
);
export const submitLoginFailure = createAction(
  '[Login] submit failure',
  props<{ res: {} }>()
);
export const submitSignup = createAction(
  '[Sign Up] submit',
  props<{ body: {} }>()
);
export const submitSignUpSuccess = createAction(
  '[Sign Up] submit Success',
  props<{ res: {} }>()
);
export const submitSignUpFailure = createAction(
  '[Sign Up] submit failure',
  props<{ res: {} }>()
);
