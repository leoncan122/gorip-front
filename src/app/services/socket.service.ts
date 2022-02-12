import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket = io('http://gorip-back.herokuapp.com/');

  constructor() {}
  public emitPosition(position: number[]) {
    this.socket.emit('position', position);
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
