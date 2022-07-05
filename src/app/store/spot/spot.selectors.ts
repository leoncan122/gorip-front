import { createSelector } from '@ngrx/store';
import { Spot } from 'src/models/spot';
import { RootState } from '../store';
import { Spots } from './spot.state';

export const selectAll = (state: RootState): Spot[] => {
  return Object.values(state.spots.entities);
};

export const selectedSpots = (state: RootState): number[] => {
  return state.spots.selected;
};
export const spotValue = createSelector(
  selectAll,
  selectedSpots,
  (selection: Spots, selectedById: number[]): [] => {
    return Object.values(selection).find(
      (spot) => spot._id === selectedById[0]
    );
  }
);
