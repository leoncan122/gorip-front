import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import * as spotsActions from './spot.action';
import { initialState } from './spot.state';

export const spotReducer = createReducer(
  initialState,
  on(spotsActions.aroundMe, (state) => {
    return { ...state };
  }),
  on(spotsActions.setSpotsSuccess, (state, { array }) => {
    return { ...state, entities: { ...array } };
  }),
  on(spotsActions.addSpotSuccess, (state, { spot }) => {
    return {
      ...state,
      entities: { ...state.entities, [spot._id]: spot },
      failure: false,
    };
  }),
  on(spotsActions.addSpotFailure, (state) => {
    return { ...state, failure: true };
  }),
  on(spotsActions.selectSpotById, (state, { id }) => {
    if (id === 0) {
      return { ...state, selected: [] };
    }
    return { ...state, selected: [id] };
  })
);
