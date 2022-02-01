import { createReducer, on } from '@ngrx/store';
import { init } from './localization.state';
import {
  localization,
  updateCoordinates,
  information,
} from './localization.action';

export const localizationReducer = createReducer(
  init,
  on(localization, (state) => {
    return { ...state };
  }),
  on(updateCoordinates, (state, { coord }) => ({
    ...state,
    localization: coord,
  })),
  on(information, (state, { info }) => {
    return { ...state, whereami: info };
  })
);
