import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  public userInput: string;
  constructor(private socketService: SocketService) {}
  public getMsg(event: any) {
    this.userInput = event.target.value;
  }
  public sendMsg() {
    this.socketService.sendMsgToRoom(this.userInput);
  }
  ngOnInit(): void {
    this.socketService
      .chatRoom()
      .subscribe((data) => console.log(';hola', data));
  }
}
