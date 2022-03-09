import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Spot } from '../../models/spot';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { RootState } from '../store/store';
import { info, information } from '../store/localization/localization.action';
import {
  selectAddressInfo,
  selectCoordinates,
} from '../store/localization/localization.selectors';
import { Spots } from '../store/spot/spot.state';
import { latLong } from '../spot-container/spot-container.component';
export interface Result {
  lat: number;
  long: number;
}

@Injectable({
  providedIn: 'root',
})
export class SpotsService {
  url = `${environment.backendURL}/api/spots`;
  result: Result;

  public addressInfo: info;

  constructor(private http: HttpClient, private store: Store<RootState>) {
    this.store.select(selectCoordinates).subscribe((data) => {
      this.coordToAddress(data[1], data[0]);
    });
    this.store
      .select(selectAddressInfo)
      .subscribe((data) => (this.addressInfo = data));
  }

  addSpot(spot: Spot | any): Observable<Spot> {
    return this.http.post<Spot>(this.url, spot);
  }

  getSpotsAroundMe(city: string): Observable<Spots> {
    return this.http.get<Spots>(`${this.url}/city/${city}`);
  }

  getSpotImage(id: any): Observable<any> {
    return this.http.get(`${this.url}/photo/${id}`);
  }
  public checkUserMatchSpot(point: latLong, interest: latLong, kms: number) {
    const resultBoolean = this.withinRadius(point, interest, kms);
    return resultBoolean;
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
  public coordToAddress = async (long: number, lat: number) => {
    // this fetch convert coord to address, there is another information like postalCode
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${environment.mapBoxToken}`
      );
      const data = await res.json();
      if (data) {
        //this.store.dispatch(setSpots({ pc: data.features[1].text }));
        this.store.dispatch(
          information({
            info: {
              pc: data?.features[1].text,
              address: data?.features[0].place_name,
              city: data?.features[2].text,
            },
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  public getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      return (this.result = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }
}
