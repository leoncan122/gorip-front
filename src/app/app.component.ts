import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Spot } from 'src/models/spot';
import { selectAll } from './store/spot/spot.selectors';
import { RootState } from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  availableSpots: Observable<Spot[]>;
  currentLocation: Observable<number[]>;
  public array: any = [];

  constructor(private store: Store<RootState>) {
    this.availableSpots = this.store.select(selectAll);
    this.currentLocation = this.store.select(
      (state) => state.localization.localization
    );
  }
  ngOnInit() {}
}
