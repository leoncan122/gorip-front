import { createAction, props } from '@ngrx/store';

export interface info {
  pc: string;
  address: string;
  city: string;
}
export const localization = createAction('[Start] Mapping');

export const updateCoordinates = createAction(
  '[Coords] Mapping',
  props<{ coord: number[] }>()
);
export const information = createAction('[Set] info', props<{ info: info }>());
