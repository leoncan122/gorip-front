import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Spot } from 'src/models/spot';
import { SocketService } from './services/socket.service';
import { updateCoordinates } from './store/localization/localization.action';
import { selectAll } from './store/spot/spot.selectors';
import { RootState } from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  availableSpots: Observable<Spot[]>;
  currentLocation: Observable<number[]>;
  public array: any = [];

  constructor(
    private store: Store<RootState>,
    private socketService: SocketService
  ) {
    this.availableSpots = this.store.select(selectAll);
    this.currentLocation = this.store.select(
      (state) => state.localization.localization
    );
  }
  public watchPosition() {
    navigator.geolocation.watchPosition(({ coords }) => {
      if ((coords.latitude, coords.longitude)) {
        updateCoordinates({
          coord: [coords.latitude, coords.longitude],
        });
        this.socketService.emitPosition([coords.latitude, coords.longitude]);
      }
    });
  }
  ngOnInit() {
    this.watchPosition();
    this.socketService.receiveUsersPosition();
  }
}
