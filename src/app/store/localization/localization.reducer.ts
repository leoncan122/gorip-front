import { createReducer, on } from '@ngrx/store';
import { init } from './localization.state';
import { localization, coords, information } from './localization.action';

export const localizationReducer = createReducer(
  init,
  on(localization, (state) => {
    return { ...state };
  }),
  on(coords, (state, { coord }) => ({ ...state, localization: coord })),
  on(information, (state, { info }) => {
    return { ...state, whereami: info };
  })
);
