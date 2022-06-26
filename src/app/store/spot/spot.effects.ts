import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  mergeMap,
  map,
  catchError,
  switchMap,
  tap,
  exhaustMap,
} from 'rxjs/operators';
import { SpotsService } from 'src/app/services/spots.service';
import * as spotActions from './spot.action';
import { Spots } from './spot.state';

@Injectable()
export class SpotEffects {
  // public submit$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(spotActions.addSpot),
  //     mergeMap((action) =>
  //       this.spotService.addSpot(action.spot).pipe(
  //         map((spot) => spotActions.addSpotSuccess({ spot })),
  //         catchError((error) => of(spotActions.addSpotFailure()))
  //       )
  //     )
  //   );
  // });
  public spotsAroundMe$ = createEffect(() => {
    return this.action$.pipe(
      ofType(spotActions.setSpots),
      tap(console.log),
      exhaustMap((action) =>
        this.spotService
          .getSpotsAroundMe(action.city)
          .pipe(
            map((res: Spots) => spotActions.setSpotsSuccess({ array: res }))
          )
      )
    );
  });
  constructor(
    private store: Store,
    private action$: Actions,
    private spotService: SpotsService
  ) {}
}
