import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from 'src/app/components/nav/nav.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { FindSpotsComponent } from 'src/app/components/find-spots/find-spots.component';
import { SpotContainerComponent } from 'src/app/spot-container/spot-container.component';
import { FooterComponent } from 'src/app/footer/footer.component';

@NgModule({
  declarations: [
    NavComponent,
    MapComponent,
    FindSpotsComponent,
    SpotContainerComponent,
    FooterComponent,
  ],
  imports: [CommonModule],
})
export class HomeModule {}
