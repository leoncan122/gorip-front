import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { coords } from 'src/app/store/localization/localization.action';
import { RootState } from 'src/app/store/store';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss'],
})
export class RefreshComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  public refreshCoords() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.store.dispatch(
        coords({ coord: [position.coords.latitude, position.coords.longitude] })
      );
    });
  }
  ngOnInit(): void {}
}
