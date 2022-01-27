import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { io } from 'socket.io-client';
import { RootState } from '../store/store';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket = io('http://localhost:4000');

  constructor() {}
}
