import { Injectable, ViewChild } from '@angular/core';
import { environment } from '@env/environment';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Store } from '@ngrx/store';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { Spots } from '../store/spot/spot.state';
import { RootState } from '../store/store';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  // @ViewChild () Asgeocoder
  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  geocoder = new MapboxGeocoder({
    accessToken: environment.mapBoxToken,
  });
  public lat: number;
  public long: number;
  public spotsFromStore$: Observable<Spots>;

  constructor(private store: Store<RootState>) {
    this.spotsFromStore$ = this.store.select((state) => state.spots.entities);
  }

  buildMap(long: number, lat: number): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.map = new mapboxgl.Map({
          accessToken: environment.mapBoxToken,
          container: 'mapa-box',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lat, long],
          zoom: 13.15,
        });
        resolve({
          map: this.map,
          geocoder: this.geocoder,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  cleanSearchInput() {
    this.geocoder.on('result', (event) => {
      this.geocoder.clear(event);
    });
  }
  getPosition = (lng: number, lat: number) => {
    this.map.panTo([lng, lat], { duration: 2000 });
  };

  addMarker(long: number, lat: number) {
    return new mapboxgl.Marker({
      color: '#FF0000',
      draggable: true,
    })
      .setLngLat([long, lat])
      .addTo(this.map);
  }
}
