import {
  Component,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userState } from 'src/app/store/auth/auth.state';
import { RootState } from 'src/app/store/store';

@Component({
  selector: '.app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public userSubscription$: Observable<userState>;
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.userSubscription$ = this.store.select((state) => state.user);
  }
}
