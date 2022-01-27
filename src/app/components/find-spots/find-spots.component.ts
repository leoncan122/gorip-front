import { Component, ElementRef, OnInit, Directive } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SpotsService } from 'src/app/services/spots.service';
import { RootState } from 'src/app/store/store';

import { Spot } from 'src/models/spot';

@Component({
  selector: 'app-find-spots',
  templateUrl: './find-spots.component.html',
  styleUrls: ['./find-spots.component.scss'],
})
export class FindSpotsComponent implements OnInit {
  @Directive({
    selector: '[appHighlight]',
  })
  public filteredList: Array<Spot> = [];
  public spotTypesList: Array<String> = [];
  public spotsFromStore$: Observable<Spot[]>;

  constructor(
    private spotService: SpotsService,
    private el: ElementRef,
    private store: Store<RootState>
  ) {
    this.spotsFromStore$ = this.store.select((state) => {
      return Object.values(state.spots.entities);
    });
  }

  public setList() {
    this.el.nativeElement;
    this.spotsFromStore$.subscribe((data) => {
      data.forEach((spot) => {
        if (!this.spotTypesList.includes(spot.type)) {
          this.spotTypesList.push(spot.type);
        }
      });
    });
  }
  public showList(e: any) {
    this.spotsFromStore$.subscribe((data) => {
      this.filteredList = data.filter((spot) => spot.type === e);
    });
  }

  ngOnInit(): void {
    this.setList();
  }
}
