import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Spot } from 'src/models/spot';
import { SocketService } from '../services/socket.service';
import { selectSpotById } from '../store/spot/spot.action';
import { selectedSpots, spotValue } from '../store/spot/spot.selectors';
import { RootState } from '../store/store';
export interface latLong {
  lat: number;
  lon: number;
}
@Component({
  selector: 'app-spot-container',
  templateUrl: './spot-container.component.html',
  styleUrls: ['./spot-container.component.scss'],
})
export class SpotContainerComponent implements OnInit {
  public spotContainerAble: false;
  public selectedSpotID$: Observable<number[]>;
  public spotObject$: any;
  public peopleInSpot: string[] = [];
  public sub: Subscription;

  public clearSpotObject(): void {
    //passing id : 0 , the reducer will empty the  selected's array
    this.store.dispatch(selectSpotById({ id: 0 }));
  }
  public usersInSpot(): void {
    this.sub = this.socketService
      .receiveUsersPosition()
      .subscribe((data: any) => {
        if (
          this.withinRadius(
            { lat: this.spotObject$.long, lon: this.spotObject$.lat },
            { lat: data.latitude, lon: data.longitude },
            0.1
          ) && //SpotObject is receiving long in change of lat, FIX!!
          !this.peopleInSpot.includes(data.id)
        ) {
          this.peopleInSpot.push(data.id);
        }
      });
  }

  constructor(
    private store: Store<RootState>,
    private socketService: SocketService
  ) {
    this.store.select(spotValue).subscribe((data) => {
      this.spotObject$ = data;
    });
  }
  public withinRadius(point: latLong, interest: latLong, kms: number) {
    'use strict';
    let R = 6371;
    let deg2rad = (n: any) => {
      return Math.tan(n * (Math.PI / 180));
    };
    let dLat = deg2rad(interest.lat - point.lat);
    let dLon = deg2rad(interest.lon - point.lon);

    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(point.lat)) *
        Math.cos(deg2rad(interest.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let d = R * c;
    return d <= kms;
  }

  ngOnInit(): void {
    this.usersInSpot();
  }
}
