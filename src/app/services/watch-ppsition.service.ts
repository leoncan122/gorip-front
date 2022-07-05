import { Injectable } from '@angular/core';
import { updateCoordinates } from '../store/localization/localization.action';

@Injectable({
  providedIn: 'root',
})
export class WatchPpsitionService {
  public options: {} = { timeout: 1000 };

  constructor() {}

  public watchPosition() {
    navigator.geolocation.watchPosition(({ coords }) => {
      alert(coords);
      if ((coords.latitude, coords.longitude)) {
        updateCoordinates({
          coord: [coords.latitude, coords.longitude],
        });

        //this.socketService.emitPosition([coords.latitude, coords.longitude]);
      }
    }),
      function errorHandler(err: any) {
        if (err.code == 1) {
          alert("Can't update localization");
        } else if (err.code == 2) {
          alert('Error: Position is unavailable!');
        }
      },
      this.options;
  }
}
