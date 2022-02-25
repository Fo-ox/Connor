import { Component, Input } from '@angular/core';
import { ChatMessage } from "../../../../models/chatList.models";

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.less']
})
export class ChatContentComponent {
    @Input() chatContent : ChatMessage;
    @Input() avatarUrl: string;
}
