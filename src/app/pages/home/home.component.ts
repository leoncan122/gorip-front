import {
  Component,
  ComponentFactoryResolver,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DinamicDirective } from 'src/app/dinamic.directive';
import { SpotsService } from 'src/app/services/spots.service';
import { SpotContainerComponent } from 'src/app/spot-container/spot-container.component';
import { updateCoordinates } from 'src/app/store/localization/localization.action';
import { localizationState } from 'src/app/store/localization/localization.state';
import { setSpots } from 'src/app/store/spot/spot.action';
import { RootState } from 'src/app/store/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(DinamicDirective) public dinamicHost: DinamicDirective;
  public x: number[] = [0, 0];
  public city: Observable<string>;
  constructor(
    private store: Store<RootState>,
    private spotService: SpotsService,
    private componentFactoryRes: ComponentFactoryResolver
  ) {
    this.store
      .select((state) => state.localization.localization)
      .subscribe((data) => {
        this.x = data;
      });

    this.city = this.store.select((state) => state.localization.whereami.city);
  }
  public createCompo() {
    const component = this.componentFactoryRes.resolveComponentFactory(
      SpotContainerComponent
    );
    this.dinamicHost.viewContainerRef.clear();

    this.dinamicHost.viewContainerRef.createComponent(component);
  }

  ngOnInit(): void {
    //this dispatch set the coordinates on the store, for first tom implement in all the app
    navigator.geolocation.getCurrentPosition((position) => {
      this.store.dispatch(
        updateCoordinates({
          coord: [position.coords.latitude, position.coords.longitude],
        })
      );
    });
    // this.store
    //   .select((state) => state.spots.entities)
    //   .subscribe((spots) => {
    //     let matchSpot = Object.values(spots).find((spot) => {
    //       return this.spotService.withinRadius(
    //         { lat: this.x[1], lon: this.x[0] },
    //         { lat: spot.lat, lon: spot.long },
    //         0.3
    //       );
    //     });
    //     console.log(matchSpot);
    //   });
    this.city.subscribe((city) => {
      if (city.length > 0) {
        this.store.dispatch(setSpots({ city }));
      }
    });
  }
}
