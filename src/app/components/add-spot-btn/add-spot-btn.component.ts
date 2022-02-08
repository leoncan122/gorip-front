import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DinamicDirective } from 'src/app/dinamic.directive';
import { AddSpotsComponent } from '../add-spots/add-spots.component';

@Component({
  selector: 'app-add-spot-btn',
  templateUrl: './add-spot-btn.component.html',
  styleUrls: ['./add-spot-btn.component.scss'],
})
export class AddSpotBtnComponent implements OnInit {
  @ViewChild(DinamicDirective) public dinamicHost: DinamicDirective;
  constructor(private componentFactoryRes: ComponentFactoryResolver) {}

  public createCompo() {
    const component =
      this.componentFactoryRes.resolveComponentFactory(AddSpotsComponent);
    this.dinamicHost.viewContainerRef.clear();
    this.dinamicHost.viewContainerRef.createComponent(component);
  }
  ngOnInit(): void {}
}
