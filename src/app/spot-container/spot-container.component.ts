import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Spot } from 'src/models/spot';
import { SocketService } from '../services/socket.service';
import { selectSpotById } from '../store/spot/spot.action';
import { selectedSpots, spotValue } from '../store/spot/spot.selectors';
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
  public peopleInSpot: string[] = [];
  public sub: Subscription;

  public clearSpotObject(): void {
    //passing id : 0 , the reducer will empty the  selected's array
    this.store.dispatch(selectSpotById({ id: 0 }));
  }
  public usersInSpot(): void {
    //this.spotObject$ = {...this.spotObject$, onPlace: [...onPlace,]};
    this.socketService
      .receiveUsersPosition()
      .subscribe((data: any) => console.log(data));
    // console.log(user);
    // this.peopleInSpot.push(user);
  }

  constructor(
    private store: Store<RootState>,
    private socketService: SocketService
  ) {
    this.store.select(spotValue).subscribe((data) => {
      this.spotObject$ = data;
    });
  }

  ngOnInit(): void {
    this.sub = this.socketService
      .receiveUsersPosition()
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
