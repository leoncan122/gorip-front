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
export interface Result {
  lat: number;
  long: number;
}

@Injectable({
  providedIn: 'root',
})
export class SpotsService {
  url = 'https://gorip-back.herokuapp.com/api/spots';
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

  addSpot(spot: Spot | Result): Observable<Spot> {
    return this.http.post<Spot>(this.url, spot);
  }

  getSpotsAroundMe(pc: string): Observable<Spots> {
    console.log(pc);
    return this.http.get<Spots>(`${this.url}/get/${pc}`);
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
