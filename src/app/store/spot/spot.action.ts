import { createAction, props } from '@ngrx/store';
import { Spot } from 'src/models/spot';
import { RootState } from '../store';
import { Spots } from './spot.state';

export const aroundMe = createAction('[Start] getSpots');

export const addSpot = createAction('[Spots] Submit', props<{ spot: Spot }>());

export const addSpotSuccess = createAction(
  '[Spots] Submit Success',
  props<{ spot: Spot }>()
);
export const addSpotFailure = createAction('[Spots] Submit Success');

export const setSpots = createAction(
  '[Spots] availableSpots',
  props<{ city: string }>()
);
export const setSpotsSuccess = createAction(
  '[Spots] availableSpots',
  props<{ array: Spots }>()
);

export const selectSpotById = createAction(
  '[Find] selectedSpot',
  props<{ id: number }>()
);
