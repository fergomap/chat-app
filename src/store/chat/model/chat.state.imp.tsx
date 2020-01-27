import ChatState from './chat.state';
import Chat from 'model/chat';
import {getInitialChats} from 'services/utils.service';

export default class ChatStateImp implements ChatState {
    chats: Chat[];
    showChatList: boolean;

    constructor(chats: Chat[] = getInitialChats(), showChatList: boolean = true) {
        this.chats = chats;
        this.showChatList = showChatList;
    }
}