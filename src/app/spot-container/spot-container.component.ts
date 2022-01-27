import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Spot } from 'src/models/spot';
import { selectSpotById } from '../store/spot/spot.action';
import { selectedSpots, spotValue } from '../store/spot/spot.selectors';
import { initialState } from '../store/spot/spot.state';
import { RootState } from '../store/store';

@Component({
  selector: 'app-spot-container',
  templateUrl: './spot-container.component.html',
  styleUrls: ['./spot-container.component.scss'],
})
export class SpotContainerComponent implements OnInit {
  public spotContainerAble: false;
  public selectedSpotID$: Observable<number[]>;
  public spotObject$: any;

  public clearSpotObject(): void {
    //passing id : 0 , the reducer will empty the  selected's array
    this.store.dispatch(selectSpotById({ id: 0 }));
  }
  constructor(private store: Store<RootState>) {
    this.store.select(spotValue).subscribe((data) => {
      this.spotObject$ = data;
    });
  }

  ngOnInit(): void {}
}
