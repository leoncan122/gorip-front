import { EventEmitter, Injectable, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Observer, takeUntil } from 'rxjs';
import { io } from 'socket.io-client';
import { selectCoordinates } from '../store/localization/localization.selectors';
import { RootState } from '../store/store';
import { SpotsService } from './spots.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket = io('https://gorip-back.herokuapp.com');
  public spots$ = this.store.select((state) => state.spots.entities);

  constructor(
    private store: Store<RootState>,
    private spotService: SpotsService
  ) {}

  public emitPosition(position: number[]) {
    this.spots$.subscribe((spots) => {
      let matchedSpot = Object.values(spots).find((spot) => {
        return this.spotService.withinRadius(
          { lat: position[1], lon: position[0] },
          { lat: spot.lat, lon: spot.long },
          0.3
        );
      });
      if (matchedSpot) this.socket.emit('position', position);
    });
  }
  public receiveUsersPosition(): any {
    let observable = new Observable((observer) => {
      this.socket.on('sharingPosition', (otherUser) => {
        observer.next(otherUser);
      });
    });
    return observable;
  }
}
