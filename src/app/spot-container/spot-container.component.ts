import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SocketService } from '../services/socket.service';
import { SpotsService } from '../services/spots.service';
import { selectSpotById } from '../store/spot/spot.action';
import { spotValue } from '../store/spot/spot.selectors';
import { RootState } from '../store/store';
export interface latLong {
  lat: number;
  lon: number;
}
@Component({
  selector: 'app-spot-container',
  templateUrl: './spot-container.component.html',
  styleUrls: ['./spot-container.component.scss'],
})
export class SpotContainerComponent implements OnInit {
  public spotContainerAble = false;
  public selectedSpotID$: Observable<number[]>;
  public spotObject: any;
  public peopleInSpot: string[] = [];
  public sub: Subscription;
  public imagePath: any;
  constructor(
    private store: Store<RootState>,
    private socketService: SocketService,
    private spotService: SpotsService,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {}
  public clearSpotObject(): void {
    //passing id : 0 , the reducer will empty the  selected's array
    // just cleaning the var spotObject will not set a spot selected anymore
    // because the component init once
    this.store.dispatch(selectSpotById({ id: 0 }));
    this.spotContainerAble = false;
    this.peopleInSpot = [];
    //this.router.navigate(['/']);
  }
  public usersInSpot(): void {
    this.sub = this.socketService
      .receiveUsersPosition()
      .subscribe((data: any) => {
        if (
          this.spotService.withinRadius(
            { lat: this.spotObject?.long, lon: this.spotObject?.lat },
            { lat: data.latitude, lon: data.longitude },
            0.2
          ) && //SpotObject is receiving long in change of lat, FIX!!
          !this.peopleInSpot.includes(data.id)
        ) {
          this.peopleInSpot.push(data.id);
          // this.socketService.connectRoom(this.spotObject._id);
        }
      });
  }

  ngOnInit(): void {
    this.store.select(spotValue).subscribe((data: any) => {
      // console.log(data);
      if (!data) return;
      console.log(data._id);
      this.socketService.connectRoom(data._id);

      this.spotContainerAble = true;
      this.spotObject = data;
      this.spotService
        .getSpotImage(data?.photo.split('/')[5].split('.')[0])
        .subscribe((data) => {
          this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + data.photo
          );
        });
    });
    this.usersInSpot();
    this.socketService.joinRoom().subscribe((data) => console.log(data));
  }
}
