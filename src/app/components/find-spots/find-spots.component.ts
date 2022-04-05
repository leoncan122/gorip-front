import {
  Component,
  ElementRef,
  OnInit,
  Directive,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  @ViewChild('itemTypeBtn')
  ItemBtn: ElementRef;
  @ViewChild('test') el: ElementRef;
  public filteredList: Array<Spot> = [];
  public spotTypesList: Array<String> = [];
  public spotsFromStore$: Observable<Spot[]>;

  constructor(private store: Store<RootState>, private renderer: Renderer2) {
    this.spotsFromStore$ = this.store.select((state) => {
      return Object.values(state.spots.entities);
    });
  }

  public setList() {
    this.spotsFromStore$.subscribe((data) => {
      data.forEach((spot) => {
        if (!this.spotTypesList.includes(spot.type)) {
          this.spotTypesList.push(spot.type);
        }
      });
    });
  }
  public showList(e: any) {
    //will add spot to the list by type
    this.spotsFromStore$.subscribe((data) => {
      this.filteredList = data.filter((spot) => spot.type === e);
    });

    //css feature
    if (
      this.ItemBtn.nativeElement.className === 'item-toogle item-toogle-anim'
    ) {
      this.renderer.removeClass(this.ItemBtn.nativeElement, 'item-toogle-anim');
    }
    //need to setTimeOut to restart the effect
    setTimeout(() => {
      this.renderer.addClass(this.ItemBtn.nativeElement, 'item-toogle-anim');
    }, 100);
  }

  ngOnInit(): void {
    this.setList();
  }
}
