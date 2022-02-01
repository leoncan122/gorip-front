import { Component, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SpotsService } from 'src/app/services/spots.service';
import { coords } from 'src/app/store/localization/localization.action';
import { localizationState } from 'src/app/store/localization/localization.state';
import { setSpots } from 'src/app/store/spot/spot.action';
import { RootState } from 'src/app/store/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public x: number[] = [0, 0];
  public postalCode: Observable<string>;
  constructor(
    private store: Store<RootState>,
    private spotService: SpotsService
  ) {
    this.store
      .select((state) => state.localization.localization)
      .subscribe((data) => {
        this.x = data;
      });
    this.postalCode = this.store.select(
      (state) => state.localization.whereami.pc
    );
  }
  public watchPosition() {
    navigator.geolocation.watchPosition((position) => {
      console.log(position);
      // coords({
      //   coord: [position.coords.latitude, position.coords.longitude],
      // });
    });
  }

  ngOnInit(): void {
    //this dispatch set the coordinates on the store, for first tom implement in all the app
    navigator.geolocation.getCurrentPosition((position) => {
      this.store.dispatch(
        coords({
          coord: [position.coords.latitude, position.coords.longitude],
        })
      );
    });
    this.watchPosition();

    this.postalCode.subscribe((pc) => {
      if (pc.length > 0) {
        this.store.dispatch(setSpots({ pc }));
      }
    });
  }
}
