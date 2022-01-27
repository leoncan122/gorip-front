import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { userState } from './auth/auth.state';
import { localizationReducer } from './localization/localization.reducer';
import { localizationState } from './localization/localization.state';
import { spotReducer } from './spot/spot.reducer';
import { spotState } from './spot/spot.state';

export interface RootState {
  localization: localizationState;
  spots: spotState;
  user: userState;
}

// pass reducer to appRouting.module
export const reducers: ActionReducerMap<RootState> = {
  localization: localizationReducer,
  spots: spotReducer,
  user: authReducer,
};
