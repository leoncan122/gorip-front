import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DinamicDirective } from 'src/app/dinamic.directive';
import { ChatRoomComponent } from '../chat-room/chat-room.component';

@Component({
  selector: 'app-join-button',
  templateUrl: './join-button.component.html',
  styleUrls: ['./join-button.component.scss'],
})
export class JoinButtonComponent implements OnInit {
  @ViewChild(DinamicDirective) public hostChat: DinamicDirective;

  constructor(private componentFactoryRes: ComponentFactoryResolver) {}

  public createRoomComponent() {
    const component =
      this.componentFactoryRes.resolveComponentFactory(ChatRoomComponent);
    this.hostChat.viewContainerRef.createComponent(component);
  }
  ngOnInit(): void {}
}
