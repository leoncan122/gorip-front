import { createSelector } from '@ngrx/store';
import { RootState } from '../store';

export const selectLocalizationFeature = (state: RootState) =>
  state.localization;

export const selectCoordinates = createSelector(
  selectLocalizationFeature,
  ({ localization }) => localization
);

export const selectAddressInfo = createSelector(
  selectLocalizationFeature,
  ({ whereami }) => whereami
);
