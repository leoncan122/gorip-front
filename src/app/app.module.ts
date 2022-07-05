import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

//components
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FindSpotsComponent } from './components/find-spots/find-spots.component';
import { MapComponent } from './components/map/map.component';
import { AddSpotsComponent } from './components/add-spots/add-spots.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { SpotEffects } from './store/spot/spot.effects';
import { SpotContainerComponent } from './spot-container/spot-container.component';
import { AuthEffects } from './store/auth/auth.effects';
import { DinamicDirective } from './dinamic.directive';
import { AddSpotBtnComponent } from './components/add-spot-btn/add-spot-btn.component';
import { JoinButtonComponent } from './components/chat/join-button/join-button.component';
import { ChatRoomComponent } from './components/chat/chat-room/chat-room.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { reducers, RootState } from './store/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { POSITION_OPTIONS } from '@ng-web-apis/geolocation';

export function localStorageSyncReducer(
  reducer: ActionReducer<RootState>
): ActionReducer<RootState> {
  return localStorageSync({
    keys: ['jwt'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<RootState, any>> = [
  localStorageSyncReducer,
];
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FindSpotsComponent,
    MapComponent,
    AddSpotsComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    SpotContainerComponent,
    DinamicDirective,
    AddSpotBtnComponent,
    JoinButtonComponent,
    ChatRoomComponent,
  ],
  entryComponents: [SpotContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([SpotEffects, AuthEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: POSITION_OPTIONS,
      useValue: { enableHighAccuracy: true, timeout: 3000, maximumAge: 5000 },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
