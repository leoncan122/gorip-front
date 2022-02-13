import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public url: string = this.apiDomain();
  public socket = io(this.url);

  constructor() {}
  public apiDomain() {
    const production = process.env.NODE_ENV === 'production';
    return production ? 'https://gorip-back.herokuapp.com' : 'localhost:8080';
  }
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
