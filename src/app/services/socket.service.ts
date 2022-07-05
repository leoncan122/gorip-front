import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { RootState } from '../store/store';
import { SpotsService } from './spots.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket = io(environment.backendURL);
  public spots$ = this.store.select((state) => state.spots);
  public spotId: number;

  constructor(
    private store: Store<RootState>,
    private spotService: SpotsService
  ) {
    this.spots$.subscribe((data) => (this.spotId = data.selected[0]));
  }

  public emitPosition(position: number[]) {
    this.spots$.subscribe((spots) => {
      let matchedSpot = Object.values(spots.entities).find((spot) => {
        return this.spotService.withinRadius(
          { lat: position[1], lon: position[0] },
          { lat: spot.lat, lon: spot.long },
          0.3
        );
      });
      if (matchedSpot) {
        this.socket.emit('position', position);
      }
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
  public connectRoom(roomId: string) {
    this.socket.emit('room', { roomId });
  }
  public joinRoom(roomId: string) {
    // console.log(roomId);
    this.socket.emit('join-room', roomId);
    // let observable = new Observable((obse) => {
    //   this.socket.on('user-connected', (msg) => {
    //     obse.next(msg);
    //   });
    // });
    // return observable;
  }
  public leaveRoom(roomId: string) {
    this.socket.emit('unsubscribe', roomId);
  }
  public chatRoom() {
    let observable = new Observable((obse) => {
      this.socket.on('msg-room', (data) => {
        obse.next(data);
      });
    });
    return observable;
  }
  public sendMsgToRoom(msg: string) {
    console.log(this.spotId);
    this.socket.emit('room', { msg, roomId: this.spotId.toString() });
  }
}
