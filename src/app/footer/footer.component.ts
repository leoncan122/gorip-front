import { Component, OnInit } from '@angular/core';
import { RootState } from '../store/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { localizationState } from '../store/localization/localization.state';

export const selectLocalizationState = (state: RootState) => {
  return state.localization;
};
@Component({
  selector: '.app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}
}
