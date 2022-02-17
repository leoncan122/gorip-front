import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as mapboxgl from 'mapbox-gl';
import { Observable, Subject } from 'rxjs';
import { MapService } from '../../services/map.service';
import { RootState } from 'src/app/store/store';
import { selectSpotById } from 'src/app/store/spot/spot.action';
import { selectCoordinates } from 'src/app/store/localization/localization.selectors';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: '.app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('asGeocoder') input: ElementRef;
  public lngLat$: Observable<number[]>;
  private onDestroy$ = new Subject<void>();

  constructor(
    private mapService: MapService,
    private store: Store<RootState>,
    private router: Router
  ) {
    this.lngLat$ = this.store.select(selectCoordinates);
  }
  ngOnDestroy() {
    this.onDestroy$.next();
    console.log('component destroyed');
  }
  ngOnInit() {
    //the map is built everyTime lngLat$ changes?
    this.lngLat$.pipe(takeUntil(this.onDestroy$)).subscribe(
      (data) => {
        this.mapService.buildMap(data[0], data[1]);
        this.mapService.map.addControl(this.mapService.geocoder);
        this.mapService.addMarker(data[1], data[0]);
        this.mapService.map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          })
        );
      },
      (err) => console.log(err),
      () => console.log('takeUntil completed')
    );

    //this.mapService.realPosition();
    this.mapService.spotsFromStore$.subscribe((data) => {
      return Object.values(data).map((spot: any) => {
        const marker = new mapboxgl.Marker({
          color: '#FF02134',
          draggable: false,
        })
          .setLngLat([spot.lat, spot.long])
          .addTo(this.mapService.map);

        marker.getElement().addEventListener('click', () => {
          this.store.dispatch(selectSpotById({ id: spot._id }));
          //this.router.navigate(['/spots']);
        });
      });
    });
  }
}
