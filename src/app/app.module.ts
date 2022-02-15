import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

//components
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FindSpotsComponent } from './components/find-spots/find-spots.component';
import { ResultsComponent } from './components/results/results.component';
import { MapComponent } from './components/map/map.component';
import { AddSpotsComponent } from './components/add-spots/add-spots.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { SpotEffects } from './store/spot/spot.effects';
import { SpotContainerComponent } from './spot-container/spot-container.component';
import { AuthEffects } from './store/auth/auth.effects';
import { DinamicDirective } from './dinamic.directive';
import { AddSpotBtnComponent } from './components/add-spot-btn/add-spot-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FindSpotsComponent,
    ResultsComponent,
    MapComponent,
    AddSpotsComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    RefreshComponent,
    SpotContainerComponent,
    DinamicDirective,
    AddSpotBtnComponent,
  ],
  entryComponents: [SpotContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([SpotEffects, AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
