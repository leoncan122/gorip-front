import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('windowChat') public window: ElementRef;
  public userInput: string;
  public historial: any[] = [];
  public windowIsAble = true;
  constructor(
    private socketService: SocketService,
    private renderer: Renderer2
  ) {}
  public getMsg(event: any) {
    this.userInput = event.target.value;
  }
  public sendMsg() {
    this.socketService.sendMsgToRoom(this.userInput);
  }
  public closeWindowChat() {
    this.windowIsAble = false;
    //this.renderer.setStyle(this.window.nativeElement, 'z-index', '-1');
  }
  public openChatAgain() {
    this.windowIsAble = true;
  }
  ngOnInit(): void {
    this.socketService.chatRoom().subscribe((data: any) => {
      this.historial = [...this.historial, data];
    });
  }
}
